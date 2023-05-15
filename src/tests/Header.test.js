import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import Header from '../components/Header';

describe('Header', () => {
  test('renders the profile and search buttons', () => {
    render(<Header />, { wrapper: MemoryRouter });

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
  });

  test('renders the search input when the search button is clicked', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders the correct page title', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Meals');
  });
});
