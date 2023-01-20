import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const notFoundText = screen.getByText(
      'No favorite Pokémon found',
    );
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
  });
});
