import { useState, useEffect } from 'react';
import RecipeInProgress from './RecipeInProgress';
import fetchRecipeId from '../services/fetchRecipeId';

function DrinksRecipesProgress() {
  const url = window.location.href.replace('/in-progress', '');
  const type = url.split('/')[3];
  const recipeID = url.split('/')[4];
  const [recipe, setRecipe] = useState('');

  // const teste = 15997;

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

export default DrinksRecipesProgress;
