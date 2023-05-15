import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import DrinksRecipesProgress from './pages/DrinksRecipesProgress';
import MealsRecipesProgress from './pages/MealsRecipesProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />

        <Route
          exact
          path="/meals"
          component={ Recipes }
        />

        <Route
          exact
          path="/meals/:id"
          component={ RecipeDetails }
        />

        <Route
          exact
          path="/drinks"
          component={ Recipes }
        />

        <Route
          exact
          path="/drinks/:id"
          component={ RecipeDetails }
        />

        <Route
          exact
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />

        <Route
          exact
          path="/profile"
          component={ Profile }
        />

        <Route
          exact
          path="/meals/:id/in-progress"
          component={ MealsRecipesProgress }
        />

        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinksRecipesProgress }
        />

        <Route
          exact
          path="/done-recipes"
          component={ DoneRecipes }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
