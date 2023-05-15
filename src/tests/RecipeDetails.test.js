import 'matchmedia-polyfill';
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeDetails from '../pages/RecipeDetails';
import RecipesDetailsMeals from '../components/RecipesDetailsMeals';
import RecipesDetailsDrinks from '../components/RecipesDetailsDrinks';

jest.mock('../components/RecipesDetailsMeals');
jest.mock('../components/RecipesDetailsDrinks');

describe('RecipeDetails', () => {
  beforeEach(() => {
    RecipesDetailsMeals.mockClear();
    RecipesDetailsDrinks.mockClear();
  });

  it('Verifique se o componente RecipesDetailsMeals é renderizado se o localion for igual a /meals/:id', () => {
    const mockLocation = {
      pathname: '/meals/123',
      hash: '',
      search: '',
      state: {},
    };

    render(
      <MemoryRouter initialEntries={ [mockLocation] }>
        <Route path="/meals/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>,
    );

    expect(RecipesDetailsMeals).toHaveBeenCalledTimes(1);
    expect(RecipesDetailsDrinks).toHaveBeenCalledTimes(0);
  });

  it('Verifique se o componente RecipesDetailsDrinks é renderizado se o localion for igual a /drinks/:id', () => {
    const mockLocation = {
      pathname: '/drinks/456',
      hash: '',
      search: '',
      state: {},
    };

    render(
      <MemoryRouter initialEntries={ [mockLocation] }>
        <Route path="/drinks/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>,
    );

    expect(RecipesDetailsMeals).toHaveBeenCalledTimes(0);
    expect(RecipesDetailsDrinks).toHaveBeenCalledTimes(1);
  });
});
