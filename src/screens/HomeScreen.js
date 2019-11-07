import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Button, Text, Input, Card } from 'react-native-elements';

import { styles } from '../styles';

/**
 * Room screen
 */
export default class HomeScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            roomName: "",
            inputError: "",
        };
    }

    changeTextHandler = (value) => this.setState({ roomName: value });
    joinRoomHandler = () => {
        const namePattern = /^[a-z0-9_-]+$/
        if (this.state.roomName.search(namePattern) == 0) {
            this.setState({ inputError: "" });
            this.props.navigation.navigate('Room', { roomName: this.state.roomName });
        }
        else {
            this._roomInput.shake();
            this.setState({ inputError: "Invalid room name" });
        }
    }

    render() {
        return (
            <ImageBackground source={require("../images/kuiperbowlAppBG.png")} style={{ width: '100%', height: '100%' }}>
                <View style={styles.homeContainer}>

                    <Text h1 style={{ textAlign: "center", color: 'white' }}>Welcome to Kuiperbowl</Text>


                    <View>
                        <Card>
                            <Input
                                label="Room"
                                ref={component => this._roomInput = component}
                                value={this.state.roomName}
                                onChangeText={this.changeTextHandler}
                                errorMessage={this.state.inputError}
                            />
                        </Card>
                        <Button title="Go!" buttonStyle={{ margin: 10 }} onPress={this.joinRoomHandler} />
                    </View>
                </View>
            </ImageBackground>
        );
    }

}