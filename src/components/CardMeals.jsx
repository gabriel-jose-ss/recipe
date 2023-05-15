import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';

export default function CardMeals() {
  const { setSearch, setRadioType, radioType, search } = useContext(AppContext);
  const history = useHistory();
  const [initialMeals, setInitialMeals] = useState([]);
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      const NUMBER = 12;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const api = await response.json();
      const data = api.meals;
      setMeals(data.slice(0, NUMBER));
      setInitialMeals(data.slice(0, NUMBER));
    };
    fetchMeals();

    const fetchCategory = async () => {
      const NUMBER = 5;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const api = await response.json();
      const data = api.meals;
      setCategory(data.slice(0, NUMBER));
    };
    fetchCategory();
  }, [setMeals]);

  const handleFilter = async (meal) => {
    if (filter === meal) {
      setMeals(initialMeals);
    } else {
      const NUMBER = 12;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`);
      const api = await response.json();
      const data = api.meals;
      setMeals(data.slice(0, NUMBER));
      setFilter(meal);
    }
  };

  const handleRoute = useCallback(() => {
    if (meals.length === 1 && meals[0].idMeal !== '52968') {
      history.push(`/meals/${meals[0].idMeal}`);
    }
  }, [meals, history]);

  useEffect(() => {
    if (radioType === 'ingredient') {
      const fetchSearch = async () => {
        try {
          const NUMBER = 12;
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
          const api = await response.json();
          const data = api.meals;
          setMeals(data.slice(0, NUMBER));
        } catch (error) {
          return global.alert(alert);
        }
      };
      fetchSearch();
    } else if (radioType === 'name') {
      const fetchSearchNameMeal = async () => {
        try {
          const NUMBER = 12;
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
          const api = await response.json();
          const data = api.meals;
          setMeals(data.slice(0, NUMBER));
        } catch (error) {
          return global.alert(alert);
        }
      };
      fetchSearchNameMeal();
    } else if (radioType === 'first-letter') {
      if (search.length !== 1) {
        setSearch('');
        setRadioType('');
        global.alert('Your search must have only 1 (one) character');
      }
      const fetchSearchLetter = async () => {
        try {
          const NUMBER = 12;
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
          const api = await response.json();
          const data = api.meals;
          setMeals(data.slice(0, NUMBER));
        } catch (error) {
          return global.alert(alert);
        }
      };
      fetchSearchLetter();
    }

    handleRoute();
  }, [radioType, setRadioType, setSearch, search, setMeals, history, meals, handleRoute]);

  const handleAllMeals = async () => {
    setMeals(initialMeals);
    setFilter([]);
  };

  return (
    <div data-testid="meals-card">
      {
        category.map((list) => (
          <button
            onClick={ () => handleFilter(list.strCategory) }
            data-testid={ `${list.strCategory}-category-filter` }
            key={ list.strCategory }
          >
            { list.strCategory }
          </button>
        ))
      }
      <button
        onClick={ handleAllMeals }
        data-testid="All-category-filter"
        type="button"
      >
        All
      </button>
      {
        meals.map((meal, index) => (
          <Link
            to={ meals.length > 1 && `/meals/${meal.idMeal}` }
            className="card-recipe"
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strTags }
            />
            <h3 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h3>
          </Link>
        ))
      }
    </div>
  );
}
