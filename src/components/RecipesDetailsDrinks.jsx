import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import noFavoriteIcon from '../images/whiteHeartIcon.svg';
import '../styles/RecipePage.css';
import SlideMeals from './SlideMeals';

const ingredients = [];

export default function RecipesDetailsDrinks() {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [isProgress, setIsProgress] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const api = await response.json();
      const data = api.drinks;

      if (data) {
        const NUMBER = 13;
        for (let index = 1; index <= NUMBER; index += 1) {
          const measure = data[0][`strMeasure${index}`];
          const ingredient = data[0][`strIngredient${index}`];
          ingredients.push(
            `${measure} ${ingredient}`,
          );
        }
      }
      setDrinks(data);
    };
    fetchDrinks();

    const recipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipe) setIsProgress(true);
  }, [setDrinks, id, setIsProgress]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (savedRecipes) {
      setFavoriteRecipe(savedRecipes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
  }, [favoriteRecipe]);

  useEffect(() => {
    const isRecipeFavorite = favoriteRecipe.some((recipe) => recipe.id === id);
    setIsFavorite(isRecipeFavorite);
  }, [favoriteRecipe, id]);

  const handleShareClick = async () => {
    const currentURL = window.location.href;
    await clipboardCopy(currentURL);
    setCopied(true);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      const recipe = {
        id: drinks[0].idDrink,
        type: 'drink',
        nationality: drinks[0].strArea || '',
        category: drinks[0].strCategory || '',
        alcoholicOrNot: drinks[0].strAlcoholic || '',
        name: drinks[0].strDrink,
        image: drinks[0].strDrinkThumb,
      };
      setFavoriteRecipe([...favoriteRecipe, recipe]);
    } else {
      const updatedRecipes = favoriteRecipe.filter(
        (recipe) => recipe.id !== drinks[0].idDrink,
      );
      setFavoriteRecipe(updatedRecipes);
    }
  };

  const handleClick = () => {
    if (location.pathname.includes('meals')) {
      history.push(`/meals/${id}/in-progress`);
    }

    if (location.pathname.includes('drinks')) {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div data-testid="drink-details">
      <button onClick={ handleShareClick } type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="Shared Icon" />
      </button>
      {copied && <p>Link copied!</p>}
      <button
        src={ isFavorite ? favoriteIcon : noFavoriteIcon }
        onClick={ handleFavorite }
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ isFavorite ? favoriteIcon : noFavoriteIcon } alt="Shared Icon" />
      </button>
      {
        drinks.map((drink) => (
          <div key={ drink.idDrink }>
            <img
              width="300px"
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
            <h4 data-testid="recipe-category">{ drink.strAlcoholic }</h4>
            <p />
            <h5>Ingredients</h5>
            <ul>
              {
                ingredients.map((ingredient, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { ingredient }
                  </li>
                ))
              }
            </ul>
            <p data-testid="instructions">{ drink.strInstructions }</p>
          </div>
        ))
      }
      <SlideMeals />
      <button
        className="btn-start"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        { isProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}
