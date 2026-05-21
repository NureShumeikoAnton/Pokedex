import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import usePokemonStore from '../store/pokemonStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
    const fetchPokemonList = usePokemonStore(state => state.fetchPokemonList);
    const setSearchQuery = usePokemonStore(state => state.setSearchQuery);
    const filterPokemons = usePokemonStore(state => state.filterPokemons);
    const searchQuery = usePokemonStore(state => state.searchQuery);
    const pokemons = filterPokemons();

    const getIdFromUrl = (url: string): number => {
        return Number(url.split('/').filter(Boolean).pop());
    };

    useEffect(() => {
        fetchPokemonList();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <TextInput placeholder="Search Pokémon..." onChangeText={setSearchQuery} />
            {pokemons.map((pokemon) => (
                <React.Fragment key={pokemon.name}>
                    <Text>{pokemon.name}</Text>
                    <Button title="View Details" onPress={() => navigation.navigate('Details', { pokemonId: getIdFromUrl(pokemon.url) })} />
                </React.Fragment>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        color: 'white',
        borderRadius: 5,
        textAlign: 'center',
        marginVertical: 5,
    },
});

export default HomeScreen;