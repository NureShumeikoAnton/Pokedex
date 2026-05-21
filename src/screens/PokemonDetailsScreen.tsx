import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import usePokemonStore from '../store/pokemonStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const PokemonDetailsScreen = ({ navigation, route }: Props) => {
    const { pokemonId } = route.params;
    const fetchPokemonById = usePokemonStore(state => state.fetchPokemonById);
    const selectedPokemon = usePokemonStore(state => state.selectedPokemon);

    const isLoading = usePokemonStore(state => state.isLoading);
    const error = usePokemonStore(state => state.error);

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    useEffect(() => {
        fetchPokemonById(pokemonId);
    }, [pokemonId]);

    if(isLoading || !selectedPokemon) {
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
            <View style={styles.headerContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{selectedPokemon?.name}</Text>
                    <Text>
                        <Text style={styles.nameText}>Id: </Text>
                        <Text style={styles.descText}>{selectedPokemon?.id}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.nameText}>Types: </Text>
                        <Text style={styles.descText}>{selectedPokemon?.types.map((t) => t.type.name).join(', ')}</Text>
                    </Text>
                </View>
            </View>
            <View>
                <Text>
                    <Text style={styles.nameText}>Height: </Text>
                    <Text style={styles.descText}>{selectedPokemon?.height}</Text>
                </Text>
                <Text>
                    <Text style={styles.nameText}>Weight: </Text>
                    <Text style={styles.descText}>{selectedPokemon?.weight}</Text>
                </Text>
                <Text>
                    <Text style={styles.nameText}>Base exp: </Text>
                    <Text style={styles.descText}>{selectedPokemon?.base_experience}</Text>
                </Text>
            </View>
            <View>
                <Text style={styles.descText}>HP: {selectedPokemon?.stats.find(s => s.stat.name === "hp")?.base_stat}</Text>
                <Text style={styles.descText}>ATTACK: {selectedPokemon?.stats.find(s => s.stat.name === "attack")?.base_stat}</Text>
                <Text style={styles.descText}>DEFENSE: {selectedPokemon?.stats.find(s => s.stat.name === "defense")?.base_stat}</Text>
                <Text style={styles.descText}>SPEED: {selectedPokemon?.stats.find(s => s.stat.name === "speed")?.base_stat}</Text>
                <Text style={styles.descText}>SPECIAL ATTACK: {selectedPokemon?.stats.find(s => s.stat.name === "special-attack")?.base_stat}</Text>
                <Text style={styles.descText}>SPECIAL DEFENSE: {selectedPokemon?.stats.find(s => s.stat.name === "special-defense")?.base_stat}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        gap: 48
    },
    headerContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'space-around',
        paddingLeft: 16,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    descText: {
        fontSize: 18,
        textTransform: 'capitalize',
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: '#d6e4f7',
        borderRadius: 15,
    },
});

export default PokemonDetailsScreen;