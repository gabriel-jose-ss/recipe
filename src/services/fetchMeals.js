const alert = 'Sorry, we haven\'t found any recipes for these filters.';

export const fetchSearchIngredientMeal = async (search) => {
  try {
    const NUMBER = 12;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    const api = await response.json();
    const data = api.meals;
    return data.slice(0, NUMBER);
  } catch (error) {
    global.alert(alert);
  }
};

export const fetchSearchIngredientDrink = async (search) => {
  try {
    const NUMBER = 12;
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
    const api = await response.json();
    const data = api.drinks;
    return data.slice(0, NUMBER);
  } catch (error) {
    global.alert(alert);
  }
};

export const fetchSearchNameMeal = async (search) => {
  try {
    const NUMBER = 12;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const api = await response.json();
    const data = api.meals;
    return data.slice(0, NUMBER);
  } catch (error) {
    global.alert(alert);
  }
};

export const fetchSearchNameDrink = async (search) => {
  try {
    const NUMBER = 12;
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const api = await response.json();
    const data = api.drinks;
    return data.slice(0, NUMBER);
  } catch (error) {
    global.alert(alert);
  }
};

export const fetchSearchLetterMeal = async (search) => {
  try {
    const NUMBER = 12;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    const api = await response.json();
    const data = api.meals;
    return data.slice(0, NUMBER);
  } catch (error) {
    global.alert(alert);
  }
};

export const fetchSearchLetterDrink = async (search) => {
  try {
    const NUMBER = 12;
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
    const api = await response.json();
    const data = api.drinks;
    return data.slice(0, NUMBER);
  } catch (error) {
    global.alert(alert);
  }
};

export const fetchApiMeals = async () => {
  const NUMBER = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const newData = data.meals;
  return newData.slice(0, NUMBER);
};

export const fetchApiDrinks = async () => {
  const NUMBER = 12;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const newData = data.drinks;
  return newData.slice(0, NUMBER);
};

export const fetchCategoryMeal = async () => {
  try {
    const NUMBER = 5;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const newData = data.meals;
    return newData.slice(0, NUMBER);
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoryDrink = async () => {
  try {
    const NUMBER = 5;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const newData = data.drinks;
    return newData.slice(0, NUMBER);
  } catch (error) {
    console.error(error);
  }
};
