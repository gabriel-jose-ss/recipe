import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import { getPageTitle } from './GetPageTitle';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const isSearchPage = location.pathname === '/meals'
    || location.pathname === '/drinks';

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const handleSearchIconClick = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <header className="header-container">
      <Link to="/profile">
        <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
      </Link>
      {isSearchPage && (
        <React.Fragment key="search">
          <img
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
            onClick={ handleSearchIconClick }

          />
          {isSearchBarVisible && <SearchBar /> }
        </React.Fragment>
      )}
      <h1 data-testid="page-title">{getPageTitle(location.pathname)}</h1>
    </header>
  );
}

export default Header;
