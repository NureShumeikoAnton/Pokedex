import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const [counter, setCounter] = React.useState(0);

    return (
        <View style={styles.container}>
            <Text style={{ paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }}>
                Hello, World!
            </Text>
            <Text>
                Counter: {counter}
            </Text>
            <Text style={styles.textButton} onPress={() => setCounter(counter + 1)}>
                Increment Counter
            </Text>
            <Text style={styles.textButton} onPress={() => setCounter(counter - 1)}>
                Decrement Counter
            </Text>
        </View>
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