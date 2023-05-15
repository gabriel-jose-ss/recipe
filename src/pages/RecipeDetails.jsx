import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesDetailsMeals from '../components/RecipesDetailsMeals';
import RecipesDetailsDrinks from '../components/RecipesDetailsDrinks';

export default function RecipeDetails() {
  const location = useLocation();
  const { id } = useParams();
  return (
    <main>
      { location.pathname === `/meals/${id}` && <RecipesDetailsMeals /> }
      { location.pathname === `/drinks/${id}` && <RecipesDetailsDrinks /> }
    </main>
  );
}
