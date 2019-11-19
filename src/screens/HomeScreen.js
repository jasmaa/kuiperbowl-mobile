import React from 'react';
import { View, ImageBackground, StatusBar } from 'react-native';
import { Button, Text, Input, Card, Icon } from 'react-native-elements';

import { styles, BootstrapColors } from '../styles';
import { version } from '../../package.json';


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
                <StatusBar hidden />
                <View style={styles.container}>
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
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'left', color: 'gray' }}>v{version}</Text>
                        <View style={{ flex: 1 }}></View>
                        <Button
                            buttonStyle={{ backgroundColor: BootstrapColors.SECONDARY }}
                            icon={
                                <Icon
                                    name="settings"
                                    size={20}
                                    color="white"
                                    type="simple-line-icon"
                                />
                            }
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }

}