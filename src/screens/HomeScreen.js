import React from 'react';
import { View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';

import { styles } from '../styles';

/**
 * Room screen
 */
export default class HomeScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.roomName = "";
        this.state = {};
    }

    changeTextHandler = (value) => this.roomName = value;
    joinRoomHandler = () => {
        this.props.navigation.navigate('Room', { roomName: this.roomName });
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <Text h1 style={{textAlign: "center"}}>Welcome to Kuiperbowl</Text>

                <View>
                    <Input label="Room" onChangeText={this.changeTextHandler} />
                    <Button title="Go!" buttonStyle={{ margin: 10 }} onPress={this.joinRoomHandler} />
                </View>
            </View>
        );
    }

}