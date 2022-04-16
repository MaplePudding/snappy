import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import { wsHost } from '../utils/APIRoutes';
import styles from './chat.module.css';
import { Contact } from '../components/contact';
import { Welcome } from '../components/welcome';
import { ChatContainer } from '../components/chatContainer';
import { apiGetAllUser } from '../http/api';

export function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/login');
    } else {
      setCurrentUser(
        JSON.parse(
          // @ts-ignore
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
        ),
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      // @ts-ignore
      socket.current = io(wsHost);
      // @ts-ignore
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);
  // @ts-ignore
  useEffect(() => {
    if (currentUser) {
      // @ts-ignore
      if (currentUser.isAvatarImageSet) {
        // @ts-ignore
        apiGetAllUser(currentUser._id)
          // @ts-ignore
          .then((data) => setContacts(data));
      } else {
        navigate('/avatar');
      }
    }
  }, [currentUser]);
  // @ts-ignore
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className={styles.container}>
      <div className={styles.child}>
        <Contact contacts={contacts} changeChat={handleChatChange} />
        {!currentChat ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
