import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import { mockDoneRecipes } from './helpers/mockData';

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
});

afterEach(() => {
  localStorage.clear();
});

const name = '0-horizontal-name';

describe('Testes component Done Recipe', () => {
  it('Verifica se renderiza os botoes de filtro', () => {
    renderWithRouter(<DoneRecipes />);
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Verifica se filtra por todas as receitas por padrao ', () => {
    renderWithRouter(<DoneRecipes />);
    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(2);
  });

  it('Verifica se filtra por receitas de comida ', () => {
    renderWithRouter(<DoneRecipes />);
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(1);
    expect(screen.getByTestId(name)).toHaveTextContent('Spaghetti Carbonara');
  });

  it('Verifica se filtra por receitas de bebida ', () => {
    renderWithRouter(<DoneRecipes />);
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(1);
    expect(screen.getByTestId(name)).toHaveTextContent('Mojito');
  });

  it('Verifica se exibe as informações da receita corretamente ', () => {
    renderWithRouter(<DoneRecipes />);
    expect(screen.getAllByTestId(/horizontal-image/i)).toHaveLength(2);
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian - Pasta');
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spaghetti Carbonara');
    expect(screen.getByTestId('0-horizontal-done-date')).toHaveTextContent('2023-05-11');
    expect(screen.getByTestId('0-Italian-horizontal-tag')).toHaveTextContent('Italian');
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toHaveTextContent('Pasta');
  });

  it('Verifica se copia o link', async () => {
    const handleCopyClick = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    renderWithRouter(<DoneRecipes />);
    const copyButton = await screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(copyButton);

    expect(handleCopyClick).toHaveBeenCalledTimes(1);
    expect(handleCopyClick).toHaveBeenCalledWith('meal', '123');
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();
    });
  });

  it('Verifica se há ou não receitas no localStorage', () => {
    renderWithRouter(<DoneRecipes />);

    const stored = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(stored).toHaveLength(2);
  });

  it('Verifica se há ou não receitas no localStorage', () => {
    localStorage.clear();
    renderWithRouter(<DoneRecipes />);

    const stored = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(stored).toBe(null);
  });
});
