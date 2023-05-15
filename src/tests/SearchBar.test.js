import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import AppContext from '../contexts/AppContext';

describe('Teste o componente SearchBar', () => {
  test('Deve atualizar o valor de entrada de pesquisa', () => {
    const { getByTestId } = render(<SearchBar />);
    const searchInputElement = getByTestId('search-input');
    userEvent.type(searchInputElement, 'chicken');
    expect(searchInputElement.value).toBe('chicken');
  });

  test('Deve atualizar o tipo de pesquisa quando o botão de rádio do ingrediente é selecionado', () => {
    const setRadioType = jest.fn();
    const { getByTestId } = render(
      <AppContext.Provider value={ { setRadioType } }>
        <SearchBar />
      </AppContext.Provider>,
    );
    const ingredientSearchRadioElement = getByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchRadioElement);
    expect(setRadioType).toHaveBeenCalledWith('ingredient');

    const nameSearchRadioElement = getByTestId('name-search-radio');
    userEvent.click(nameSearchRadioElement);
    expect(setRadioType).toHaveBeenCalledWith('name');

    const firstLetterSearchRadioElement = getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterSearchRadioElement);
    expect(setRadioType).toHaveBeenCalledWith('first-letter');
  });

  test('Deve executar a pesquisa quando o botão de pesquisa for clicado', () => {
    const setSearch = jest.fn();
    const setRadioType = jest.fn();
    const { getByTestId } = render(
      <AppContext.Provider value={ { setSearch, setRadioType } }>
        <SearchBar />
      </AppContext.Provider>,
    );
    const searchInputElement = getByTestId('search-input');
    const nameSearchRadioElement = getByTestId('name-search-radio');
    const execSearchBtnElement = getByTestId('exec-search-btn');
    userEvent.type(searchInputElement, 'chicken');
    userEvent.click(nameSearchRadioElement);
    userEvent.click(execSearchBtnElement);
    expect(setSearch).toHaveBeenCalledWith('chicken');
    expect(setRadioType).toHaveBeenCalledWith('name');
  });
});
