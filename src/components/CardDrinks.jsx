import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';

export default function CardDrinks() {
  const { setSearch, setRadioType, radioType, search } = useContext(AppContext);
  const history = useHistory();
  const [drinks, setDrinks] = useState([]);
  const [category, setCategory] = useState([]);
  const [initialDrinks, setInitialDrinks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchDrinks = async () => {
      const NUMBER = 12;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const api = await response.json();
      const data = api.drinks;
      setDrinks(data.slice(0, NUMBER));
      setInitialDrinks(data.slice(0, NUMBER));
    };
    fetchDrinks();

    const fetchCategory = async () => {
      const NUMBER = 5;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const api = await response.json();
      const data = api.drinks;
      setCategory(data.slice(0, NUMBER));
    };
    fetchCategory();
  }, [setDrinks]);

  useEffect(() => {
    if (radioType === 'ingredient') {
      const fetchSearchIngredientDrinks = async () => {
        try {
          const NUMBER = 12;
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
          const api = await response.json();
          const data = api.drinks;
          setDrinks(data.slice(0, NUMBER));
        } catch (error) {
          return global.alert(alert);
        }
      };
      fetchSearchIngredientDrinks();
    } else if (radioType === 'name') {
      const fetchSearchNameDrinks = async () => {
        try {
          const NUMBER = 12;
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
          const api = await response.json();
          const data = api.drinks;
          setDrinks(data.slice(0, NUMBER));
        } catch (error) {
          return global.alert(alert);
        }
      };
      fetchSearchNameDrinks();
    } else if (radioType === 'first-letter') {
      if (search.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        setSearch('');
        setRadioType('');
      }
      const fetchSearchLetter = async () => {
        try {
          const NUMBER = 12;
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
          const api = await response.json();
          const data = api.drinks;
          setDrinks(data.slice(0, NUMBER));
        } catch (error) {
          return global.alert(alert);
        }
      };
      fetchSearchLetter();
    }
    if (drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    }
  }, [radioType, search, setDrinks, history, drinks, setRadioType, setSearch]);

  const handleFilter = async (drink) => {
    if (filter === drink) {
      setDrinks(initialDrinks);
    } else {
      const NUMBER = 12;
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`);
      const api = await response.json();
      const data = api.drinks;
      setDrinks(data.slice(0, NUMBER));
      setFilter(drink);
    }
  };

  const handleAllDrinks = async () => {
    setDrinks(initialDrinks);
    setFilter([]);
  };

  return (
    <div data-testid="drinks-card">
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
        onClick={ handleAllDrinks }
        data-testid="All-category-filter"
        type="button"
      >
        All
      </button>
      {
        drinks.map((drink, index) => (
          <Link
            to={ drinks.length > 1 && `/drinks/${drink.idDrink}` }
            className="card-recipe"
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt="Drink"
            />
            <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
          </Link>
        ))
      }
    </div>
  );
}
