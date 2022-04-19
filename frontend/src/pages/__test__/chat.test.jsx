import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router'
import { Chat } from '../chat';

jest.mock('../../components/welcome', () => {
  return {
    __esModule: true,
    Welcome: () => <div>Welcome</div>,
    }
});

jest.mock('socket.io-client', () =>{
    return{
        esModule: true,
        io: jest.fn(() =>{
            return{
                emit: jest.fn(() => {}),
                on: jest.fn(() =>{})
            }})
    }
})

const USERINFO =
  '{"username":"admin4","email":"admin4@gmail.com","password":"$2a$10$XLY9dqwgIIPID5YFl148Iu.vxWxtvRmhzMXjAUZ.7DelQKeoNWm8e","isAvatarImageSet":true,"avatarImage":"image","_id":"625ad8d30b9d917e22b19ba6","__v":0}';

jest.mock('../../http/api', () => {
  return {
    __esModule: true,
    apiGetAllUser: jest.fn(() => { return new Promise((resolve, reject) =>{
          resolve([
            {
          avatarImage: '',
          email: 'admin2@gmail.com',
          username: 'admin1',
          _id: '625a65490b9d917e22b19b87',
        },
            {
          avatarImage: '',
          email: 'admin2@gmail.com',
          username: 'admin2',
          _id: '625a65490b9d917e22b19b88',
        }
      ])
    })
  })
  }})

describe('Chat Page Test', () => {
  test('Navigate To Login', async () =>{
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </BrowserRouter>,
    );

    await waitFor(() =>{
      expect(screen.queryByText('Login')).toBeTruthy();
    });
  });

  test('Basic Structure', async () =>{
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>,
    );

    await waitFor(() =>{
      expect(screen.queryByText('Welcome')).toBeTruthy();
      expect(screen.queryByText('snappy')).toBeTruthy();
    });
  });

  test('User List', async () =>{
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>,
    );
    await waitFor(() =>{
      expect(screen.queryByText('admin1')).toBeTruthy();
      expect(screen.queryByText('admin2')).toBeTruthy();
    });
  });
});
