import React from 'react';
import { Switch, View } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { styles, BootstrapColors, modeStyles } from '../styles';


export default class SettingsScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            colorMode: this.props.navigation.getParam('colorMode')
        }
    }

    colorModeSwitchHandler = () => {
        const oldHandler = this.props.navigation.getParam('colorModeSwitchHandler');
        oldHandler();
        const newColorMode = this.state.colorMode == 'light' ? 'dark' : 'light';
        this.setState({ colorMode: newColorMode });
    }
    cacheResetHandler = () => {
        // put cache reset here
    }
    swipeHandler = (gestureName, gestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_RIGHT:
                this.props.navigation.goBack();
        }
    }

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={this.swipeHandler}
                config={config}
                style={modeStyles[this.state.colorMode].body}
            >
                <View style={styles.container}>
                    <Card containerStyle={modeStyles[this.state.colorMode].card}>
                        <Text h4 style={{ ...modeStyles[this.state.colorMode].cardText, textAlign: "center" }}>
                            Settings
                        </Text>
                    </Card>

                    <Card containerStyle={modeStyles[this.state.colorMode].card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={modeStyles[this.state.colorMode].cardText}>
                                {this.state.colorMode == 'light' ? "Light Mode" : "Dark Mode"}
                            </Text>
                            <View style={{ flex: 1 }}></View>
                            <Switch
                                value={this.state.colorMode != 'light'}
                                onChange={this.colorModeSwitchHandler}
                            />
                        </View>
                    </Card>

                    <Card containerStyle={modeStyles[this.state.colorMode].card}>
                        <Button
                            title="Reset Cache"
                            buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.DANGER }}
                            onPress={this.cacheResetHandler}
                        />
                    </Card>
                </View>
            </GestureRecognizer>
        );
    }
}