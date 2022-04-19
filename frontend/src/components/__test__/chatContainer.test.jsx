import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChatContainer } from '../chatContainer';
import { apiAddMsg } from '../../http/api';

const CURRENTCHAT = {
  avatarImage: 'img',
  email: 'maple@qq.com',
  username: 'maple',
  _id: '6245746dd873ec1b2980b44d',
};
const USERINFO =
  '{"username":"admin4","email":"admin4@gmail.com","password":"$2a$10$XLY9dqwgIIPID5YFl148Iu.vxWxtvRmhzMXjAUZ.7DelQKeoNWm8e","isAvatarImageSet":true,"avatarImage":"image","_id":"625ad8d30b9d917e22b19ba6","__v":0}';
const SOCKET = {
  current: {
    on: () => {},
    emit: jest.fn(() => {}),
  },
};

jest.mock('../../http/api', () => ({
  __esModule: true,
  apiGetMsg: jest.fn(
    (params) =>
      new Promise((resolve, reject) => {
        resolve([
          { fromSelf: true, message: '111' },
          { fromSelf: true, message: '111' },
          { fromSelf: true, message: '111' },
        ]);
      }),
  ),
  apiAddMsg: jest.fn((params) => params.message),
}));

describe('ChatContainer Component Test', () => {
  test('Basic Structure', async () => {
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);
    window.HTMLElement.prototype.scrollIntoView = function () {};
    render(
      <BrowserRouter>
        <ChatContainer currentChat={CURRENTCHAT} socket={SOCKET} />
      </BrowserRouter>,
    );

    waitFor(() => {
      expect(screen.queryByText(CURRENTCHAT.username)).toBeTruthy();
      expect(screen.queryByAltText('avatar')).toBeTruthy();
      expect(screen.queryAllByAltText('1111')).toHaveLength(3);
      expect(
        screen.queryByPlaceholderText('type your message here'),
      ).toBeTruthy();
    });
  });

  test('Send Message', async () => {
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);
    window.HTMLElement.prototype.scrollIntoView = jest.fn(() => {});

    render(
      <BrowserRouter>
        <ChatContainer currentChat={CURRENTCHAT} socket={SOCKET} />
      </BrowserRouter>,
    );

    const input = screen.queryByPlaceholderText('type your message here');

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText('type your message here'),
      ).toBeTruthy();
      expect(apiAddMsg.mock.calls.length).toBe(1);
      expect(apiAddMsg.mock.results[0].value).toBe('1');
      expect(screen.queryByText('1')).toBeTruthy();
      expect(SOCKET.current.emit.mock.calls.length).toBe(1);
    });
  });
});
