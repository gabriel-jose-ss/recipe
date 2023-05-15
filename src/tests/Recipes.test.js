import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Recipes from '../pages/Recipes';

test('Verifique se a página de comida é renderizada', () => {
  const history = createMemoryHistory();
  history.push('/meals');
  render(
    <Router history={ history }>
      <Recipes />
    </Router>,
  );

  const mealsCard = screen.getByTestId('meals-card');

  expect(mealsCard).toBeInTheDocument();
});

test('Verifique se a página de bebidas é renderizada', () => {
  const history = createMemoryHistory();
  history.push('/drinks');
  render(
    <Router history={ history }>
      <Recipes />
    </Router>,
  );

  const drinksCard = screen.getByTestId('drinks-card');

  expect(drinksCard).toBeInTheDocument();
});
