import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(doneRecipes);
  }, []);

  const handleFilterClick = (event) => {
    const filterValue = event.target.dataset.filter;
    setFilter(filterValue);
  };
  const time = 2000;

  const handleCopyClick = (type, id) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), time);
  };

  const filteredRecipes = filter === 'all'
    ? recipes
    : recipes.filter((recipe) => recipe.type === filter);

  return (
    <div>
      <Header />
<div className='card-container'>
      <div>
        <button
          onClick={ handleFilterClick }
          data-filter="all"
          data-testid="filter-by-all-btn"
          className='button-geral'
        >
          All
        </button>
        <button
          onClick={ handleFilterClick }
          data-filter="meal"
          data-testid="filter-by-meal-btn"
          className='button-geral'
        >
          Meals
        </button>
        <button
          onClick={ handleFilterClick }
          data-filter="drink"
          data-testid="filter-by-drink-btn"
          className='button-geral'
        >
          Drinks
        </button>
      </div>
      <div>
        {filteredRecipes.map((recipe, index) => (
          <div key={ index } className='card'>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                width="300px"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            {recipe.type === 'meal' ? (
              <div data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </div>
            ) : (
              <div data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </div>
            )}
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>
            <div data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </div>
            <button
            
            className='button-geral shareImg'
              data-testid="shared"
              onClick={ () => handleCopyClick(recipe.type, recipe.id) }
            >
              <img
         
                src={ shareIcon }
                alt="share icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {copied && <div>Link copied!</div>}
            <div>
              {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={ tagIndex }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default DoneRecipes;
