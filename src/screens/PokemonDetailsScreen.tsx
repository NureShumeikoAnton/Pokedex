import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import usePokemonStore from '../store/pokemonStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const PokemonDetailsScreen = ({navigation, route}: Props) => {
    const { pokemonId } = route.params;
    const fetchPokemonById = usePokemonStore(state => state.fetchPokemonById);
    const selectedPokemon = usePokemonStore(state => state.selectedPokemon);

    useEffect(() => {
        fetchPokemonById(pokemonId);
    }, [pokemonId]);

    console.log(selectedPokemon);

    return (
        <View>
            <Text>{pokemonId}</Text>
        </View>
    )
};

export default PokemonDetailsScreen;