import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import styles from './chatContainer.module.css';
import { recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { Logout } from './logout';
import { ChatInput } from './chatInput';

export function ChatContainer({
  currentChat,
  socket,
}: {
  currentChat: any;
  socket: any;
}) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // @ts-ignore
  useEffect(() => {
    const data = JSON.parse(
      // @ts-ignore
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
    );
    axios
      .post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      })
      .then((res) => setMessages(res.data));
  }, [currentChat]);

  // useEffect(() => {
  //  const getCurrentChat = () => {
  //    if (currentChat) {
  //      const temp = JSON.parse(
  //        // @ts-ignore
  //        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
  //      )._id;
  //      return temp;
  //    }
  //  };
  //  getCurrentChat();
  // }, [currentChat]);
  // @ts-ignore
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      // @ts-ignore
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
    );
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    // @ts-ignore
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      // @ts-ignore
      socket.current.on('msg-recieve', (msg) => {
        // @ts-ignore
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    // @ts-ignore
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles['chat-header']}>
        <div className={styles['user-details']}>
          <div className={styles.avatar}>
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className={styles.username}>
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className={styles['chat-messages']}>
        {messages.map((message) => (
          // @ts-ignore
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`${styles.message} ${
                // @ts-ignore
                message.fromSelf ? styles.sended : styles.recieved
              }`}
            >
              <div className={styles.content}>
                {/* @ts-ignore */}
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
