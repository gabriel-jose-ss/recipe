import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Testes component Footer', () => {
  it('Verifica se renderiza os dois buttons e se possuem os icones corretos', () => {
    renderWithRouter(<Footer />);
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
});
