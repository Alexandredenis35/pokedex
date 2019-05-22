import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'filter'
})
export class FilterPokemonPipePipe implements PipeTransform {

  transform(pokemons: Pokemon[], searchText: string): Pokemon[] {
    if (!pokemons) return [];
    if (!searchText) return pokemons;

    searchText = searchText.toLowerCase();
    return pokemons.filter(pokemon => {
      return pokemon.toString().toLowerCase().substring(0, searchText.length) === (searchText);
    });
  }
}
