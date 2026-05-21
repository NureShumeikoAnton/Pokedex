import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PokemonListItem } from '../types/Pokemon';
import { getIdFromUrl } from '../utils/pokemon';

type Props = {
    item: PokemonListItem;
    index: number;
    onPress: () => void;
};

const PokemonCard = ({ item, index, onPress }: Props) => {
    const id = getIdFromUrl(item.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.name}>{index + 1}. {item.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    image: {
        width: '33%',
        aspectRatio: 1,
        backgroundColor: '#d6e4f7',
    },
    name: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 16,
        textTransform: 'capitalize',
    },
});

export default PokemonCard;
