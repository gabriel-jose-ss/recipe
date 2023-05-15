import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

const mockEmail = { email: 'test@example.com' };

describe('Testes da Página Profile', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('Verifique se todos os elementos e componentes estão sendo renderizados na tela', () => {
    localStorage.setItem('user', JSON.stringify(mockEmail));
    renderWithRouter(<Profile />);

    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    const title = screen.getByRole('img', { name: /profile/i });
    const doneBtn = screen.getByRole('button', { name: /done recipes/i });
    const favBtn = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    const mealsIcon = screen.getByRole('img', { name: /ícone de comida/i });
    const drinksIcon = screen.getByRole('img', { name: /ícone de bebidas/i });

    act(() => {
      expect(screen.getByTestId('profile-email')).toHaveTextContent('test@example.com');
      expect(profileIcon).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(doneBtn).toBeInTheDocument();
      expect(favBtn).toBeInTheDocument();
      expect(logoutBtn).toBeInTheDocument();
      expect(mealsIcon).toBeInTheDocument();
      expect(drinksIcon).toBeInTheDocument();
    });
  });
  test('Verifique se botão done recipes tem comportamento esperado', () => {
    localStorage.setItem('user', JSON.stringify(mockEmail));
    const { history } = renderWithRouter(<Profile />);

    const doneBtn = screen.getByRole('button', { name: /done recipes/i });

    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Verifique se botão favorite recipes tem comportamento esperado', () => {
    localStorage.setItem('user', JSON.stringify(mockEmail));
    const { history } = renderWithRouter(<Profile />);

    const favBtn = screen.getByRole('button', { name: /favorite recipes/i });

    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Verifique se botão logout tem comportamento esperado', () => {
    localStorage.setItem('user', JSON.stringify(mockEmail));
    const { history } = renderWithRouter(<Profile />);

    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
  });
});
