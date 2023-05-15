import React from 'react';
import { useLocation } from 'react-router-dom';
import CardDrinks from '../components/CardDrinks';
import CardMeals from '../components/CardMeals';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Recipes.css';

function Recipes() {
  const location = useLocation();
  return (
    <main style={{ padding: '20px' }} >
      <Header />
      { location.pathname === '/meals' && <CardMeals /> }
      { location.pathname === '/drinks' && <CardDrinks /> }
      <Footer />
    </main>
  );
}

export default Recipes;
