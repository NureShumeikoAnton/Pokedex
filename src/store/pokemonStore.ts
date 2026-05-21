import { create } from 'zustand';

interface PokemonState {
    pokemons: PokemonListItem[];
    selectedPokemon: any | null;
    searchQuery: string;
    fetchPokemonList: () => void;
    fetchPokemonById: (id: number) => void;
    filterPokemons: () => any[];
    setSearchQuery: (query: string) => void;
}

const usePokemonStore = create<PokemonState>((set, get) => ({
    pokemons: [],
    selectedPokemon: null,
    searchQuery: '',
    fetchPokemonList: () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(res => res.json())
            .then(res => set({ pokemons: res.results }))
            .catch(error => console.error('Error fetching Pokémon list:', error));
    },
    fetchPokemonById: (id: number) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(res => set({ selectedPokemon: res }))
            .catch(error => console.error(`Error fetching Pokémon with ID ${id}:`, error));
    },
    filterPokemons: () => {
        const { pokemons, searchQuery } = get();
        if (!searchQuery) return pokemons;
        return pokemons.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    },
    setSearchQuery: (query: string) => set({ searchQuery: query })
}))

export default usePokemonStore;