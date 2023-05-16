import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Home.css';
import '../styles/Profile.css';



export default function Profile() {
  const data = JSON.parse(localStorage.getItem('user'));
  const email = data && data.email;

  return (
 <div>
      <Header />
      <div className='container-profile'>
      <h4 data-testid="profile-email">{email}</h4>
      <Link to="/done-recipes" className='link-css'>
        <button
          type="button"
          data-testid="profile-done-btn"
          className='button-profile'
        >
          Done Recipes
        </button>

      </Link>
      <Link to="/favorite-recipes" className='link-css'>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className='button-profile'
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/" className='link-css'>
        <button
          type="button"
          data-testid="profile-logout-btn"
          className='button-profile'
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
    </div>
  );
}
