import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { apiLogin } from '../../http/api';
import { Login } from '../login';

const USERNAME = 'admin';
const PASSWORD = 'adminadminadmin';

jest.mock('../../http/api', () => ({
  __esModule: true,
  apiLogin: jest.fn((params) => params),
}));

describe('Login Component Test', () => {
  test('Basic Structure', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(screen.queryByText('snappy')).toBeTruthy();
    expect(screen.queryByAltText('logo')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Username')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Password')).toBeTruthy();
    expect(screen.queryByText('Login')).toBeTruthy();
    expect(screen.queryByText('Register')).toBeTruthy();
  });

  test('Form Element', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const usernameInput = screen.queryByPlaceholderText('Username');
    const passwordInput = screen.queryByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: USERNAME } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });

    expect(usernameInput.value).toBe(USERNAME);
    expect(passwordInput.value).toBe(PASSWORD);
  });

  test('Submit Form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const usernameInput = screen.queryByPlaceholderText('Username');
    const passwordInput = screen.queryByPlaceholderText('Password');
    const submitBtn = screen.queryByText('Login');

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    fireEvent.click(submitBtn);

    expect(apiLogin).not.toHaveBeenCalled();

    fireEvent.change(usernameInput, { target: { value: USERNAME } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });

    fireEvent.click(submitBtn);

    expect(apiLogin).toHaveBeenCalledTimes(1);
  });
});
