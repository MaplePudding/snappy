import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import Logo from '../assets/logo.svg';
import styles from './register.module.css';
import 'react-toastify/dist/ReactToastify.css';

export function Register() {
  const navigate = useNavigate();

  const toastOptions: ToastOptions<Record<string, unknown>> = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error(
        'Password and confirm password should be same.',
        toastOptions,
      );
      return false;
    }
    if (username.length < 3) {
      toast.error(
        'Username should be greater than 3 characters.',
        toastOptions,
      );
      return false;
    }
    if (password.length < 8) {
      toast.error(
        'Password should be equal or greater than 8 characters.',
        toastOptions,
      );
      return false;
    }
    if (email === '') {
      toast.error('Email is required.', toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      // @ts-ignore
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
      </form>
      <span className={styles.tip}>
        already have an account ? <Link to="/login">Login</Link>
      </span>
      <ToastContainer />
    </div>
  );
}
