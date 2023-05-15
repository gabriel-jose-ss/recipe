import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const SECONDS_NUMBERS = 3000;

export default function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storedFavorites) {
      setFavoriteRecipes(storedFavorites);
    }
  }, []);

  const handleFilter = (type) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (type === 'all') {
      setFavoriteRecipes(storedFavorites);
    }

    if (type === 'meal') {
      const mealsFilter = storedFavorites.filter((item) => item.type === 'meal');
      setFavoriteRecipes(mealsFilter);
    }

    if (type === 'drink') {
      const drinksFilter = storedFavorites.filter((item) => item.type === 'drink');
      setFavoriteRecipes(drinksFilter);
    }
  };

  function handleRemoveFavorite(index) {
    const newFavorites = [...favoriteRecipes];
    newFavorites.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipes(newFavorites);
  }

  function handleShareRecipe(index) {
    const recipe = favoriteRecipes[index];
    const recipeUrl = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(recipeUrl);

    const message = document.createElement('div');
    message.textContent = 'Link copied!';
    message.style.position = 'fixed';
    message.style.top = '10px';
    message.style.right = '10px';
    message.style.padding = '10px';
    message.style.backgroundColor = 'white';
    message.style.border = '1px solid black';

    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, SECONDS_NUMBERS);
  }

  return (
    <div data-testid="favorite-component">
      <Header />
      <div data-testid="drink-details">
        <button
          onClick={ () => handleFilter('all') }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          onClick={ () => handleFilter('meal') }
          data-testid="filter-by-meal-btn"
        >
          Meals

        </button>
        <button
          onClick={ () => handleFilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
      </div>
      <div>
        {favoriteRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                width="300px"
                className="recipe-image"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {
                recipe.type === 'drink' ? recipe.alcoholicOrNot
                  : `${recipe.nationality} - ${recipe.category}`
              }
            </p>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>
            <button
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShareRecipe(index) }
            >
              <img src={ shareIcon } alt="Share" />
            </button>
            <button
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleRemoveFavorite(index) }
            >
              <img src={ blackHeartIcon } alt="Remove favorite" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
