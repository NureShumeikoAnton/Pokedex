import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
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
    const isLoading = usePokemonStore(state => state.isLoading);
    const error = usePokemonStore(state => state.error);

    const filteredPokemons = useMemo(() => {
        if (!searchQuery) return pokemons;
        return pokemons.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [pokemons, searchQuery]);

    useEffect(() => {
        fetchPokemonList();
    }, []);

    const renderItem = ({ item, index }: { item: PokemonListItem; index: number }) => (
        <PokemonCard
            item={item}
            index={index}
            onPress={() => navigation.navigate('Details', { pokemonId: getIdFromUrl(item.url) })}
        />
    );

    if(isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if(error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredPokemons}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchInput: {
        margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    list: {
        gap: 10,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default HomeScreen;