import { create } from 'zustand';
import { Pokemon, PokemonListItem } from '../types/Pokemon';

interface PokemonState {
    pokemons: PokemonListItem[];
    selectedPokemon: Pokemon | null;
    searchQuery: string;

    isLoading: boolean;
    error: string | null;

    fetchPokemonList: () => void;
    fetchPokemonById: (id: number) => void;
    setSearchQuery: (query: string) => void;
}

const usePokemonStore = create<PokemonState>((set, get) => ({
    pokemons: [],
    selectedPokemon: null,
    searchQuery: '',
    isLoading: false,
    error: null,
    fetchPokemonList: () => {
        set({ isLoading: true, error: null });
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(res => res.json())
            .then(res => set({ pokemons: res.results }))
            .catch(error => set({ error: error.message }))
            .finally(() => set({ isLoading: false }));
    },
    fetchPokemonById: (id: number) => {
        set({ isLoading: true, error: null });
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(res => set({ selectedPokemon: res }))
            .catch(error => set({ error: error.message }))
            .finally(() => set({ isLoading: false }));
    },
    setSearchQuery: (query: string) => set({ searchQuery: query })
}))

export default usePokemonStore;