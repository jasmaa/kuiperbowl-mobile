import React from 'react';
import { FlatList, Switch, Alert, ScrollView, View } from 'react-native';
import { Input, Text, ListItem, Button, Card } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';

import { styles, BootstrapColors, modeStyles } from '../styles';

/**
 * Room screen
 */
export default class ProfileConfig extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            handle: this.props.handle
        }
    }

    changeNameHandler = (text) => {
        this.props.K.setName(text);
        this.setState({ handle: text });
    }
    changeDifficultyHandler = (option) => this.props.K.setDifficulty(option.label);
    changeCategoryHandler = (option) => this.props.K.setCategory(option.label);
    resetScoreHandler = () => {
        Alert.alert(
            'Reset Score',
            'Are you sure you want to reset?',
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => this.props.K.resetScore() },
            ],
        );
    };

    setScrollHeight = (width, height) => this.setState({ scrollHeight: height });

    render() {

        // Update handle when value received
        if (this.state.handle == null) {
            this.setState({ handle: this.props.handle });
        }

        return (
            <ScrollView
                style={{ ...modeStyles[this.props.colorMode].body, height: this.state.scrollHeight }}
                onContentSizeChange={this.setScrollHeight}
            >
                <View style={styles.container}>
                    <Card containerStyle={modeStyles[this.props.colorMode].card}>
                        <Text h4 style={{ ...modeStyles[this.props.colorMode].cardText, textAlign: "center" }}>
                            {this.props.K.roomName}
                        </Text>
                    </Card>

                    <Card containerStyle={modeStyles[this.props.colorMode].card}>
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
                            initValue={this.props.category}
                            onChange={this.changeCategoryHandler}
                            ref={selector => { this._categorySelector = selector; }}
                            customSelector={<Button
                                title={this.props.category}
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
                            initValue={this.props.difficulty}
                            onChange={this.changeDifficultyHandler}
                            ref={selector => { this._difficultySelector = selector; }}
                            customSelector={<Button
                                title={this.props.difficulty}
                                onPress={() => this._difficultySelector.open()}
                                buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.INFO }}
                            />}
                        />
                    </Card>

                    <Card containerStyle={modeStyles[this.props.colorMode].card}>
                        <Input
                            label="Handle"
                            value={this.state.handle}
                            onChangeText={this.changeNameHandler}
                            labelStyle={modeStyles[this.props.colorMode].cardText}
                            inputStyle={modeStyles[this.props.colorMode].cardText}
                        />

                        <FlatList
                            data={this.props.scores}
                            renderItem={({ item }) =>
                                <ListItem
                                    title={"" + item[0]}
                                    rightTitle={"" + item[1]}
                                    containerStyle={modeStyles[this.props.colorMode].card}
                                    titleStyle={modeStyles[this.props.colorMode].cardText}
                                    rightTitleStyle={modeStyles[this.props.colorMode].cardText}
                                    bottomDivider
                                />
                            }
                        />
                    </Card>

                    <Card containerStyle={modeStyles[this.props.colorMode].card}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={modeStyles[this.props.colorMode].cardText}>
                                {this.props.colorMode == 'light' ? "Light Mode" : "Dark Mode"}
                            </Text>
                            <View style={{ flex: 1 }}></View>
                            <Switch
                                value={this.props.colorMode != 'light'}
                                onChange={this.props.colorModeSwitchHandler}
                            />
                        </View>
                    </Card>

                    <Card containerStyle={modeStyles[this.props.colorMode].card}>
                        <Button
                            title="Reset Score"
                            buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.SECONDARY }}
                            onPress={this.resetScoreHandler}
                        />
                        <Button
                            title="Leave Room"
                            buttonStyle={{ margin: 10, backgroundColor: BootstrapColors.DANGER }}
                            onPress={this.props.leaveRoomHandler}
                        />
                    </Card>
                </View>
            </ScrollView >
        );
    }
}