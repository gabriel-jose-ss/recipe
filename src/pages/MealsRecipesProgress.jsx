import { useState, useEffect } from 'react';
import RecipeInProgress from './RecipeInProgress';
import fetchRecipeId from '../services/fetchRecipeId';

function MealsRecipesProgress() {
  const url = window.location.href.replace('/in-progress', '');
  const type = 'meals';
  const recipeID = url.split('/')[4];
  const [recipe, setRecipe] = useState('');

  // const teste = 52977;

  useEffect(() => {
    async function fetch() {
      setRecipe(await fetchRecipeId(recipeID, type));
    }
    fetch();
  }, [recipeID, type]);

  return (
    <div>
      <RecipeInProgress type={ type } recipe={ recipe } url={ url } />
    </div>
  );
}

export default MealsRecipesProgress;
