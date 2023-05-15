import { render, screen } from '@testing-library/react';
import DrinksRecipesProgress from '../pages/DrinksRecipesProgress';
import MealsRecipesProgress from '../pages/MealsRecipesProgress';
import renderWithRouter from './helpers/renderWithRouter';

const mockDrinksFetch = {
  drinks: [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strTags: null,
      strCategory: 'Ordinary Drink',
      strAlcoholic: 'Optional alcohol',
      strInstructions:
        'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      strIngredient1: 'Galliano',
      strIngredient2: 'Ginger ale',
      strIngredient3: 'Ice',
      strMeasure1: '2 1/2 shots ',
    },
  ],
};

const mockMealsFetch = {
  meals: [
    {
      idMeal: '52977',
      strMeal: 'Corba',
      strCategory: 'Side',
      strArea: 'Turkish',
      strInstructions:
        'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you\u2019ll have to break up later\r\nIn a large pot over medium-high heat, saut\u00e9 the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      strTags: 'Soup',
      strIngredient1: 'Lentils',
      strIngredient2: 'Onion',
      strIngredient3: 'Carrots',
      strIngredient4: 'Tomato Puree',
      strIngredient5: 'Cumin',
      strIngredient6: 'Paprika',
      strIngredient7: 'Mint',
      strIngredient8: 'Thyme',
      strIngredient9: 'Black Pepper',
      strIngredient10: 'Red Pepper Flakes',
      strIngredient11: 'Vegetable Stock',
      strIngredient12: 'Water',
      strIngredient13: 'Sea Salt',
      strMeasure1: '1 cup ',
      strMeasure2: '1 large',
      strMeasure3: '1 large',
      strMeasure4: '1 tbs',
      strMeasure5: '2 tsp',
      strMeasure6: '1 tsp ',
      strMeasure7: '1/2 tsp',
      strMeasure8: '1/2 tsp',
      strMeasure9: '1/4 tsp',
      strMeasure10: '1/4 tsp',
      strMeasure11: '4 cups ',
      strMeasure12: '1 cup ',
      strMeasure13: 'Pinch',
    },
  ],
};

describe('Testes das páginas RecipesProgress', () => {
  it('Testa os elementos da DrinksRecipesProgress', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksFetch),
    });

    render(<DrinksRecipesProgress />);
    const title = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const image = await screen.findByTestId('recipe-photo');
    const instructions = await screen.findByTestId('instructions');
    expect(title.textContent).toBe('GG');
    expect(category.textContent).toBe('Optional alcohol');
    expect(image.src).toBe(
      'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    );
    expect(instructions.children.length).toBe(4);

    expect(await screen.findByTestId('finish-recipe-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();
  });

  it('Testa os elementos da MealsRecipesProgress', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsFetch),
    });

    renderWithRouter(<MealsRecipesProgress />);
    const title = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    const image = await screen.findByTestId('recipe-photo');
    const instructions = await screen.findByTestId('instructions');
    expect(title.textContent).toBe('Corba');
    expect(category.textContent).toBe('Side');
    expect(image.src).toBe(
      'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    );
    expect(instructions.children.length).toBe(14);

    expect(await screen.findByTestId('finish-recipe-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();
  });
});
