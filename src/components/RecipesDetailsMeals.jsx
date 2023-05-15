import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import SlideDrinks from './SlideDrinks';
import shareIcon from '../images/shareIcon.svg';
import noFavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

const ingredients = [];

export default function RecipesDetailsMeals() {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [isProgress, setIsProgress] = useState(false);
  const [meals, setMeals] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const api = await response.json();
      const data = api.meals;

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
      setMeals(data);
    };
    fetchMeals();

    const recipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipe) setIsProgress(true);
  }, [setMeals, id, setIsProgress]);

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
        id: meals[0].idMeal,
        type: 'meal',
        nationality: meals[0].strArea || '',
        category: meals[0].strCategory || '',
        alcoholicOrNot: meals[0].strAlcoholic || '',
        name: meals[0].strMeal,
        image: meals[0].strMealThumb,
      };
      setFavoriteRecipe([...favoriteRecipe, recipe]);
    } else {
      const updatedRecipes = favoriteRecipe.filter(
        (recipe) => recipe.id !== meals[0].idMeal,
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
    <div data-testid="meal-details">
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
        meals.map((meal) => (
          <div key={ meal.idMeal }>
            <img
              width="300px"
              data-testid="recipe-photo"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
            <h4 data-testid="recipe-category">{ meal.strCategory }</h4>
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
            <p data-testid="instructions">{ meal.strInstructions }</p>
            <iframe
              data-testid="video"
              title={ meal.strMeal }
              width="300"
              height="150"
              src={ meal.strYoutube.replace('watch?v=', 'embed/') }
            />
          </div>
        ))
      }
      <SlideDrinks />
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
