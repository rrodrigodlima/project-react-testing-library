import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const pokedexText = screen.getByText(
      'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon',
    );
    const pokedexText2 = screen.getByText(
      'One can filter Pokémon by type, and see more details for each one of them',
    );
    expect(pokedexText).toBeInTheDocument();
    expect(pokedexText2).toBeInTheDocument();

    const pokedexTitle = screen.getByRole(
      'heading',
      { name: 'About Pokédex' },
    );
    expect(pokedexTitle).toBeInTheDocument();

    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
