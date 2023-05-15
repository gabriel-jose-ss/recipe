const fetchRecipeId = async (id, type) => {
  let URL = '';
  if (type === 'drinks') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchRecipeId;
