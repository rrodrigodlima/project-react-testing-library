import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByText('More details');
    userEvent.click(detailsBtn);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${'6.0'} ${'kg'}`);

    const pokeImg = screen.getByAltText(/Pikachu sprite/i);
    expect(pokeImg).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsBtn = screen.getByText('More details');
    userEvent.click(detailsBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
