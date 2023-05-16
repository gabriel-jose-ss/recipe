import React from 'react';
import { useLocation } from 'react-router-dom';
import CardDrinks from '../components/CardDrinks';
import CardMeals from '../components/CardMeals';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Home.css';

function Recipes() {
  const location = useLocation();
  return (
    <main >
      <Header />
      <div className='container-recipes'>
      { location.pathname === '/meals' && <CardMeals /> }
      { location.pathname === '/drinks' && <CardDrinks /> }
      </div>
      <Footer />
    </main>
  );
}

export default Recipes;
