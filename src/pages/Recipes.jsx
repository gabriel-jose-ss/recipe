import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Recipes.css';
import CardMeals from '../components/CardMeals';
import CardDrinks from '../components/CardDrinks';

function Recipes() {
  const location = useLocation();
  return (
    <main>
      <Header />
      { location.pathname === '/meals' && <CardMeals /> }
      { location.pathname === '/drinks' && <CardDrinks /> }
      <Footer />
    </main>
  );
}

export default Recipes;
