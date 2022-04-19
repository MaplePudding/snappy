import { render, screen } from '@testing-library/react';
import { Welcome } from '../welcome';

const USERINFO =
  '{"username":"admin4","email":"admin4@gmail.com","password":"$2a$10$XLY9dqwgIIPID5YFl148Iu.vxWxtvRmhzMXjAUZ.7DelQKeoNWm8e","isAvatarImageSet":true,"avatarImage":"image","_id":"625ad8d30b9d917e22b19ba6","__v":0}';

describe('Welcome Component Test', () => {
  test('Basic Structure', () => {
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, USERINFO);

    render(<Welcome />);

    expect(screen.queryByAltText('robot')).toBeTruthy();
    expect(screen.queryByText('admin4!')).toBeTruthy();
  });
});
