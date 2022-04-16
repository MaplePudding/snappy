import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import axios from 'axios';
import styles from './avatar.module.css';
import Loader from '../assets/loader.gif';
import { setAvatarRoute } from '../utils/APIRoutes';
import {apiSetAvatar} from "../http/api";

export function Avatar() {
  const api = 'https://api.multiavatar.com/4645646';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<undefined | number>(
    undefined,
  );
  const toastOptions: ToastOptions<Record<string, unknown>> = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    // @ts-ignore
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/login');
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = await JSON.parse(
        // @ts-ignore
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
      );

      const data = await apiSetAvatar({userId: user._id, image: avatars[selectedAvatar]});

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          // @ts-ignore
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user),
        );
        navigate('/');
      } else {
        toast.error('Error setting avatar. Please try again.', toastOptions);
      }
    }
  };

  useEffect(() => {
    // @ts-ignore
    const data = [];
    const allRequest = []

    for(let i = 0; i < 4; ++i){
      allRequest.push(axios.get(`${api}/${Math.round(Math.random() * 10)}`))
    }

    Promise.all(allRequest).then((arr) => {
      for(let item of arr){
        const buffer = Buffer.from(item.data)
        data.push(buffer.toString('base64'));
      }
      // @ts-ignore
      setAvatars(data)
    })

    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={styles.container}>
          <img src={Loader} alt="loader" className={styles.loader} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles['title-container']}>
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className={styles.avatars}>
            {avatars.map((avatar, index) => (
              <div
                className={`${styles.avatar} ${
                  selectedAvatar === index ? styles.selected : ''
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  role="presentation"
                  key={avatar}
                  onClick={() => setSelectedAvatar(index)}
                  onKeyDown={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={setProfilePicture}
            className={styles['submit-btn']}
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
