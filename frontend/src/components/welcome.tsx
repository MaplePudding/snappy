import React, { useEffect, useState } from 'react';
import styles from './welcome.module.css';
import Robot from '../assets/robot.gif';

export function Welcome() {
  const [userName, setUserName] = useState('');
  // @ts-ignore
  useEffect(() => {
    setUserName(
      JSON.parse(
        // @ts-ignore
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
      )?.username,
    );
  }, []);
  return (
    <div className={styles.container}>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
