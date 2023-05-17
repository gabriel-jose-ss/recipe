import React, { useContext, useState } from 'react';
import AppContext from '../contexts/AppContext';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const [searchType, setSearchType] = useState('');
  const { search, setSearch, setRadioType } = useContext(AppContext);

  const handleRadioChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    setRadioType(searchType);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />

      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-type"
          value="ingredient"
          id="ingredient"
          checked={ searchType === 'ingredient' }
          onChange={ handleRadioChange }
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search-type"
          value="name"
          id="name"
          checked={ searchType === 'name' }
          onChange={ handleRadioChange }
        />
      </label>

      <label htmlFor="first-letter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-type"
          value="first-letter"
          id="first-letter"
          checked={ searchType === 'first-letter' }
          onChange={ handleRadioChange }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
        className='button-geral'
      >
        Search

      </button>
    </div>
  );
}
