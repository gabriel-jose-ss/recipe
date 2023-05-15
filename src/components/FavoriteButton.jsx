import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const typeMelsDrink = window.location.pathname.split('/')[1];
  const idRecipe = typeMelsDrink === 'meals' ? 'idMeal' : 'idDrink';
  const favoriteRecipes = useMemo(() => (
    localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes'))
      : []
  ), []);

  useEffect(() => {
    if (recipe) {
      const fav = favoriteRecipes.some(
        (favRecipe) => favRecipe.id === recipe[0][idRecipe],
      );
      setIsFavorited(fav);
    }
  }, [recipe, favoriteRecipes, idRecipe]);

  const handleFavoriteBtn = () => {
    const newFavRecipe = {
      id: recipe[0][idRecipe],
      type: typeMelsDrink === 'meals' ? 'meal' : 'drink',
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
    };

    if (!isFavorited) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipes, newFavRecipe]),
      );
      setIsFavorited(true);
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(
          favoriteRecipes.filter((recipes) => recipes.id !== newFavRecipe.id),
        ),
      );
      setIsFavorited(false);
    }
  };

  return (
    <button type="button" onClick={ handleFavoriteBtn }>
      <img
        data-testid="favorite-btn"
        src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
        alt="favorite-link"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.arrayOf(
    PropTypes.shape({
      idMeal: PropTypes.string,
      idDrink: PropTypes.string,
      strArea: PropTypes.string,
      strCategory: PropTypes.string,
      strAlcoholic: PropTypes.string,
      strDrink: PropTypes.string,
      strMeal: PropTypes.string,
      strDrinkThumb: PropTypes.string,
      strMealThumb: PropTypes.string,
    }),
  ).isRequired,
};

export default FavoriteButton;
