import PropTypes from 'prop-types';
import RecipeIngredients from '../components/RecipeIngredients';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

function RecipeInProgress({ recipe, type, url }) {
  if (recipe === '') {
    return <h1>Carregando</h1>;
  }
  let receita = '';
  let category = '';
  let image = '';
  let title = '';

  if (type === 'meals') {
    [receita] = recipe.meals;
    title = receita.strMeal;
    category = receita.strCategory;
    image = receita.strMealThumb;
  } else {
    [receita] = recipe.drinks;
    title = receita.strDrink;
    category = receita.strAlcoholic;
    image = receita.strDrinkThumb;
  }

  const instructions = receita.strInstructions.split('.');
  return (
    <div className="recipe-details-container">
      <div className="details-header">
        <img
          src={ image }
          alt={ title }
          data-testid="recipe-photo"
          className="recipe-image"
        />

        <div className="button-container">
          <p data-testid="recipe-category">{category}</p>
          <FavoriteButton recipe={ recipe[type] } />
          <ShareButton url={ url } dataTestid="share-btn" />
        </div>
        <h1 data-testid="recipe-title">{title}</h1>
      </div>

      <div className="details-wrapper">
        <h1>Instruções</h1>
        <div data-testid="instructions" className="intructions">
          {instructions.map((item) => (
            <p key={ item }>{item}</p>
          ))}
        </div>
        <h1>Ingredientes</h1>
        <RecipeIngredients recipe={ receita } />
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      meals: PropTypes.arrayOf(
        PropTypes.shape({
          strMeal: PropTypes.string.isRequired,
          strCategory: PropTypes.string.isRequired,
          strMealThumb: PropTypes.string.isRequired,
          strInstructions: PropTypes.string.isRequired,
        }),
      ),
      drinks: PropTypes.arrayOf(
        PropTypes.shape({
          strDrink: PropTypes.string.isRequired,
          strAlcoholic: PropTypes.string.isRequired,
          strDrinkThumb: PropTypes.string.isRequired,
          strInstructions: PropTypes.string.isRequired,
        }),
      ),
    }),
  ]).isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default RecipeInProgress;
