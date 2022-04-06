import { useNavigate } from 'react-router';
import { BiPowerOff } from 'react-icons/bi';
import axios from 'axios';
import React from 'react';
import styles from './logout.module.css';
import { logoutRoute } from '../utils/APIRoutes';

export function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      // @ts-ignore
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <button type="button" onClick={handleClick} className={styles.container}>
      <BiPowerOff />
    </button>
  );
}
