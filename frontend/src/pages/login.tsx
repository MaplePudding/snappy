import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import Logo from '../assets/logo.svg';
import styles from './login.module.css';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const toastOptions: ToastOptions<Record<string, unknown>> = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  useEffect(() => {
    // @ts-ignore
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    }
    if (password === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          // @ts-ignore
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user),
        );

        navigate('/');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="logo" />
        <h1>snappy</h1>
      </div>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Login</button>
      </form>
      <span className={styles.tip}>
        Don &apos t have an account ? <Link to="/register">Register</Link>
      </span>
      <ToastContainer />
    </div>
  );
}
