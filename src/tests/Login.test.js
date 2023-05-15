import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes da Página Login', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('Verifique o comportamento dos inputs', () => {
    renderWithRouter(<Login />);

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
    userEvent.type(password, '123456');
    expect(password.value).toBe('123456');

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'user@user.com');
    expect(email.value).toBe('user@user.com');
  });

  test('Verifique se o comportamento do button', () => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /enter/i });

    expect(button).toBeDisabled();

    act(() => {
      userEvent.type(email, 'teste@teste.com');
      userEvent.type(password, '1234567');
    });

    expect(button).toBeEnabled();

    userEvent.click(button);

    const store = JSON.parse(localStorage.getItem('user')).email;
    expect(store).toBe('teste@teste.com');
    expect(history.location.pathname).toBe('/meals');
  });
});
