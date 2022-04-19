import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { Contact } from '../contact';

const USERINFO =
  '{"username":"admin4","email":"admin4@gmail.com","password":"$2a$10$XLY9dqwgIIPID5YFl148Iu.vxWxtvRmhzMXjAUZ.7DelQKeoNWm8e","isAvatarImageSet":true,"avatarImage":"image","_id":"625ad8d30b9d917e22b19ba6","__v":0}';
const CONTACT_LIST = [
  { _id: 1, username: 'admin1' },
  { _id: 2, username: 'admin2' },
];

describe('Contact Component Test', () => {
  test('Basic Structure', async () => {
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);

    render(<Contact contacts={CONTACT_LIST} changeChat={() => {}} />);

    await waitFor(() => {
      expect(screen.queryByText('snappy')).toBeTruthy();
      expect(screen.queryByText(JSON.parse(USERINFO).username)).toBeTruthy();
      expect(screen.queryByText(CONTACT_LIST[0].username)).toBeTruthy();
      expect(screen.queryByText(CONTACT_LIST[1].username)).toBeTruthy();
    });
  });

  test('Change Contact', async () => {
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);
    const changeChat = jest.fn(() => {});

    render(<Contact contacts={CONTACT_LIST} changeChat={changeChat} />);

    await waitFor(() => {
      const user1 = screen.queryByText(CONTACT_LIST[0].username);
      const user2 = screen.queryByText(CONTACT_LIST[1].username);
      expect(changeChat.mock.calls.length).toBe(0);

      fireEvent.click(user1);

      expect(changeChat.mock.calls.length).toBe(1);
      expect(changeChat.mock.calls[0][0].username).toBe('admin1');

      fireEvent.click(user2);

      expect(changeChat.mock.calls.length).toBe(2);
      expect(changeChat.mock.calls[1][0].username).toBe('admin2');
    });
  });
});
