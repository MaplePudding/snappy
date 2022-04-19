import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../register';
import { apiRegister } from '../../http/api';

const USERNAME = 'admin';
const PASSWORD = 'adminadminadmin';
const EMAIL = 'admin@gmail.com';

jest.mock('../../http/api', () => ({
  __esModule: true,
  apiRegister: jest.fn((params) => params),
}));

describe('Register Component Test', () => {
  test('Basic Structure', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );
    expect(screen.queryByText('snappy')).toBeTruthy();
    expect(screen.queryByAltText('logo')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Username')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Password')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Email')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(screen.queryByText('Create User')).toBeTruthy();
    expect(screen.queryByText('Login')).toBeTruthy();
  });

  test('Form Element', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    const usernameInput = screen.queryByPlaceholderText('Username');
    const passwordInput = screen.queryByPlaceholderText('Password');
    const emailInput = screen.queryByPlaceholderText('Email');
    const confirmInput = screen.queryByPlaceholderText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: USERNAME } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(confirmInput, { target: { value: PASSWORD } });

    expect(usernameInput.value).toBe(USERNAME);
    expect(passwordInput.value).toBe(PASSWORD);
    expect(emailInput.value).toBe(EMAIL);
    expect(confirmInput.value).toBe(PASSWORD);
  });

  test('Submit Form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    const usernameInput = screen.queryByPlaceholderText('Username');
    const passwordInput = screen.queryByPlaceholderText('Password');
    const emailInput = screen.queryByPlaceholderText('Email');
    const confirmInput = screen.queryByPlaceholderText('Confirm Password');
    const submitBtn = screen.queryByText('Create User');

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(confirmInput, { target: { value: '' } });

    fireEvent.click(submitBtn);

    expect(apiRegister).not.toHaveBeenCalled();

    fireEvent.change(usernameInput, { target: { value: USERNAME } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(confirmInput, { target: { value: '' } });

    fireEvent.click(submitBtn);

    expect(apiRegister).not.toHaveBeenCalled();

    fireEvent.change(usernameInput, { target: { value: USERNAME } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(confirmInput, { target: { value: PASSWORD } });

    fireEvent.click(submitBtn);

    expect(apiRegister).toHaveBeenCalled();
  });
});
