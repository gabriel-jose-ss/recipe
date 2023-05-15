import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoriteRecipes from '../pages/FavoriteRecipes';

test('Verifique se a página de favoritos é renderizada', () => {
  const history = createMemoryHistory();
  history.push('/favorite-recipes');
  render(
    <Router history={ history }>
      <FavoriteRecipes />
    </Router>,
  );

  const favorite = screen.getByTestId('favorite-component');

  expect(favorite).toBeInTheDocument();
});
