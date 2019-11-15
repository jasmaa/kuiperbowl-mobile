import React from 'react';
import { FlatList, Switch, Alert, ScrollView, View } from 'react-native';
import { Input, Text, ListItem, Button, Card } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { styles, BootstrapColors, modeStyles } from '../styles';

/**
 * Room screen
 */
export default class ProfileScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.K = this.props.navigation.getParam('K');

        this.oldCallback = this.K.updateCallback;
        this.K.updateCallback = (clientState) => {
            this.setState(clientState);
        };
    }

    swipeHandler = (gestureName, gestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
                this.K.updateCallback = this.oldCallback;
                this.props.navigation.goBack();
                break;
        }
    }

    changeNameHandler = (text) => this.K.setName(text);
    changeDifficultyHandler = (option) => this.K.setDifficulty(option.label);
    changeCategoryHandler = (option) => this.K.setCategory(option.label);
    resetScoreHandler = () => {
        Alert.alert(
            'Reset Score',
            'Are you sure you want to reset?',
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => this.K.resetScore() },
            ],
        );
    };
    leaveRoomHandler = () => {
        this.K.deinit();
        this.props.navigation.navigate("Home");
    }

    render() {

        const colorMode = this.props.navigation.getParam("colorMode", "light");
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={this.swipeHandler}
                config={config}
                style={modeStyles[colorMode].body}
            >
                <ScrollView
                    style={modeStyles[colorMode].body}
                >
                    <View style={styles.container}>
                        <Card containerStyle={modeStyles[colorMode].card}>
                            <Text h4 style={{ ...modeStyles[colorMode].cardText, textAlign: "center" }}>
                                {this.K.roomName}
                            </Text>
                        </Card>

                        <Card containerStyle={modeStyles[colorMode].card}>
                            <ModalSelector
                                data={[
                                    { key: "Everything", label: "Everything" },
                                    { key: "Science", label: "Science" },
                                    { key: "History", label: "History" },
                                    { key: "Literature", label: "Literature" },
                                    { key: "Philosophy", label: "Philosophy" },
                                    { key: "Religion", label: "Religion" },
                                    { key: "Geography", label: "Geography" },
                                    { key: "Fine Arts", label: "Fine Arts" },
                                    { key: "Social Studies", label: "Social Studies" },
                                    { key: "Mythology", label: "Mythology" },
                                    { key: "Trash", label: "Trash" },
                                ]}
                                initValue={this.K.clientState.room_category}
                                onChange={this.changeCategoryHandler}
                                ref={selector => { this._categorySelector = selector; }}
                                customSelector={<Button
                                    title={this.K.clientState.room_category}
                                    onPress={() => this._categorySelector.open()}
                                    buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.INFO }}
                                />}
                            />
                            <ModalSelector
                                data={[
                                    { key: "HS", label: "HS" },
                                    { key: "MS", label: "MS" },
                                    { key: "College", label: "College" },
                                ]}
                                initValue={this.K.clientState.difficulty}
                                onChange={this.changeDifficultyHandler}
                                ref={selector => { this._difficultySelector = selector; }}
                                customSelector={<Button
                                    title={this.K.clientState.difficulty}
                                    onPress={() => this._difficultySelector.open()}
                                    buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.INFO }}
                                />}
                            />
                        </Card>

                        <Card containerStyle={modeStyles[colorMode].card}>
                            <Input
                                label="Handle"
                                value={this.K.clientState.player_name}
                                onChangeText={this.changeNameHandler}
                                labelStyle={modeStyles[colorMode].cardText}
                                inputStyle={modeStyles[colorMode].cardText}
                            />

                            <FlatList
                                data={this.K.clientState.scores}
                                renderItem={({ item }) =>
                                    <ListItem
                                        title={"" + item[0]}
                                        rightTitle={"" + item[1]}
                                        containerStyle={modeStyles[colorMode].card}
                                        titleStyle={modeStyles[colorMode].cardText}
                                        rightTitleStyle={modeStyles[colorMode].cardText}
                                        bottomDivider
                                    />
                                }
                            />
                        </Card>

                        <Card containerStyle={modeStyles[colorMode].card}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={modeStyles[colorMode].cardText}>
                                    {colorMode == 'light' ? "Light Mode" : "Dark Mode"}
                                </Text>
                                <View style={{ flex: 1 }}></View>
                                <Switch
                                    value={colorMode != 'light'}

                                />
                            </View>
                        </Card>

                        <Card containerStyle={modeStyles[colorMode].card}>
                            <Button
                                title="Reset Score"
                                buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.SECONDARY }}
                                onPress={this.resetScoreHandler}
                            />
                            <Button
                                title="Leave Room"
                                buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.DANGER }}
                                onPress={this.leaveRoomHandler}
                            />
                        </Card>
                    </View>
                </ScrollView>
            </GestureRecognizer>
        );
    }
}