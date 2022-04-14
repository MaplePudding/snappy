import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import styles from './contact.module.css';

export function Contact({
  contacts,
  changeChat,
}: {
  contacts: any;
  changeChat: any;
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  // @ts-ignore
  useEffect(() => {
    const data = JSON.parse(
      // @ts-ignore
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
    );
    // @ts-ignore
    setCurrentUserName(data?.username);
    // @ts-ignore
    setCurrentUserImage(data?.avatarImage);
  }, []);
  // @ts-ignore
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div>
      {currentUserImage && currentUserImage && (
        <div className={styles.container}>
          <div className={styles.brand}>
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className={styles.contacts}>
            {
              // @ts-ignore
              contacts.map((contact, index) => (
                <div
                  onClick={() => changeCurrentChat(index, contact)}
                  onKeyDown={() => changeCurrentChat(index, contact)}
                  key={contact._id}
                  role="button"
                  tabIndex={0}
                  className={`${styles.contact} ${
                    index === currentSelected ? styles.selected : ''
                  }`}
                >
                  <div className={styles.avatar}>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className={styles.username}>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              ))
            }
          </div>
          <div className={styles['current-user']}>
            <div className={styles.avatar}>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className={styles.username}>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
