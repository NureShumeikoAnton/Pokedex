import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import usePokemonStore from '../store/pokemonStore';
import { getIdFromUrl } from '../utils/pokemon';
import { PokemonListItem } from '../types/Pokemon';
import PokemonCard from '../components/PokemonCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
    const pokemons = usePokemonStore(state => state.pokemons);
    const fetchPokemonList = usePokemonStore(state => state.fetchPokemonList);
    const setSearchQuery = usePokemonStore(state => state.setSearchQuery);
    const searchQuery = usePokemonStore(state => state.searchQuery);

    useEffect(() => {
        fetchPokemonList();
    }, []);

    const filteredPokemons = useMemo(() => {
        if (!searchQuery) return pokemons;
        return pokemons.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [pokemons, searchQuery]);

    const renderItem = ({ item, index }: { item: PokemonListItem; index: number }) => (
        <PokemonCard
            item={item}
            index={index}
            onPress={() => navigation.navigate('Details', { pokemonId: getIdFromUrl(item.url) })}
        />
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredPokemons}
                keyExtractor={item => item.name}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    list: {
        gap: 10,
        paddingBottom: 16,
    },
});

export default HomeScreen;