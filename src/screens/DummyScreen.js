import React from 'react';
import { View, ImageBackground, StatusBar, FlatList, ScrollView } from 'react-native';
import { Button, Text, Input, Card } from 'react-native-elements';

import { styles } from '../styles';

/**
 * Room screen
 */
export default class DummyScreen extends React.PureComponent {

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={[
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                        ["person", "30"],
                    ]}
                    renderItem={({ item }) => <Text h1>{item[0]}</Text>}
                />
            </ScrollView>
        );
    }
}