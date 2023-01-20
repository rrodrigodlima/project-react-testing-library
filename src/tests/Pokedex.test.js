import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const homeTitle = screen.getByRole(
      'heading',
      { name: 'Encountered Pokémon' },
    );

    expect(homeTitle).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const fireBtn = screen.getByRole('button', {
      name: 'Fire',
    });

    userEvent.click(fireBtn);

    const pokeNameChar = screen.getByText('Charmander');
    expect(pokeNameChar).toBeInTheDocument();

    const typeBtn = screen.getAllByTestId('pokemon-type-button')[1];
    userEvent.click(typeBtn);

    const pokeValue = screen.getByTestId('pokemon-name').innerHTML;
    expect(pokeValue).toBe('Charmander');

    const nextBtn = screen.getByRole('button', {
      name: 'Próximo Pokémon',
    });

    userEvent.click(nextBtn);

    const rapidash = screen.getByTestId('pokemon-name').innerHTML;
    expect(rapidash).toBe('Rapidash');

    const allBtn = screen.getByRole('button', {
      name: 'All',
    });

    userEvent.click(allBtn);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
