import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={PokemonDetailsScreen} />
        </Stack.Navigator>
    );
};

export default RootNavigator;