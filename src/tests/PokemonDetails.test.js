import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByText('More details');
    userEvent.click(detailsBtn);

    const detailsTitle = screen.getByRole(
      'heading',
      { name: 'Pikachu Details' },
    );
    expect(detailsTitle).toBeInTheDocument();

    expect(detailsBtn).not.toBeInTheDocument();

    const sumaryTitle = screen.getByRole(
      'heading',
      { name: 'Summary' },
    );
    expect(sumaryTitle).toBeInTheDocument();

    const sumaryText = screen.getByText(
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    );
    expect(sumaryText).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsBtn = screen.getByText('More details');
    userEvent.click(detailsBtn);

    const locationsTitle = screen.getByRole(
      'heading',
      { name: 'Game Locations of Pikachu' },
    );
    expect(locationsTitle).toBeInTheDocument();

    const pokeMap = screen.getAllByAltText('Pikachu location');
    expect(pokeMap).toHaveLength(2);

    const pokeMapOne = getByText('Kanto Viridian Forest');
    const pokeMapTwo = getByText('Kanto Power Plant');
    expect(pokeMapOne).toBeInTheDocument();
    expect(pokeMapTwo).toBeInTheDocument();

    expect(pokeMap[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokeMap[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(favoriteStar).not.toBeInTheDocument();

    const favoriteLabel = screen.getByRole(
      'checkbox',
      { name: 'Pokémon favoritado?' },
    );
    expect(favoriteLabel).toBeInTheDocument();
  });
});
