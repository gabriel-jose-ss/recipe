import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="Ícone de Comidas"
          className="footer__icon"
          data-testid="meals-bottom-btn"
        />
      </Link>
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="Ícone de Bebidas"
          className="footer__icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
