import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function FinishButton({ isFinish, recipe }) {
  const history = useHistory();
  const type = window.location.pathname.split('/')[1];
  const idRecipe = type === 'meals' ? 'idMeal' : 'idDrink';
  let storageRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (storageRecipes === null) storageRecipes = [];
  const today = new Date();
  const isoString = today.toISOString();

  function formatRecipe() {
    const newRecipe = {
      id: recipe[idRecipe],
      type: type === 'meals' ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strDrink || recipe.strMeal,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
      tags: recipe.strTags === null ? [] : recipe.strTags.split(','),
      doneDate: isoString,
    };
    return newRecipe;
  }

  function handleClick() {
    const recipeToStorage = formatRecipe();
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...storageRecipes, recipeToStorage]),
    );
    localStorage.removeItem('inProgressRecipes');

    history.push('/done-recipes');
  }

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ !isFinish }
      onClick={ handleClick }
      className="start-btn"
    >
      Finalizar
    </button>
  );
}

FinishButton.propTypes = {
  isFinish: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
};

export default FinishButton;
