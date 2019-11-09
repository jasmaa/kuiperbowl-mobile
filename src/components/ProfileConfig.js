import React from 'react';
import { FlatList, Picker, Alert, ScrollView, View } from 'react-native';
import { Input, Text, ListItem, Button, Card } from 'react-native-elements';

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
    changeDifficultyHandler = (itemValue, _) => this.props.K.setDifficulty(itemValue);
    changeCategoryHandler = (itemValue, _) => this.props.K.setCategory(itemValue);
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

    render() {

        // Update handle when value received
        if (this.state.handle == null) {
            this.setState({ handle: this.props.handle });
        }

        return (
            <ScrollView style={modeStyles[this.props.colorMode].body}>
                <View style={styles.container}>
                    <Card containerStyle={modeStyles[this.props.colorMode].card}>
                        <Text h4 style={{ ...modeStyles[this.props.colorMode].cardText, textAlign: "center" }}>
                            {this.props.K.roomName}
                        </Text>
                    </Card>

                    <Card containerStyle={modeStyles[this.props.colorMode].card}>
                        <Picker
                            selectedValue={this.props.category}
                            onValueChange={this.changeCategoryHandler}
                        >
                            <Picker.Item label="Everything" value="Everything" />
                            <Picker.Item label="Science" value="Science" />
                            <Picker.Item label="History" value="History" />
                            <Picker.Item label="Literature" value="Literature" />
                            <Picker.Item label="Philosophy" value="Philosophy" />
                            <Picker.Item label="Religion" value="Religion" />
                            <Picker.Item label="Geography" value="Geography" />
                            <Picker.Item label="Fine Arts" value="Fine Arts" />
                            <Picker.Item label="Social Studies" value="Social Studies" />
                            <Picker.Item label="Mythology" value="Mythology" />
                            <Picker.Item label="Trash" value="Trash" />
                        </Picker>
                        <Picker
                            selectedValue={this.props.difficulty}
                            onValueChange={this.changeDifficultyHandler}
                        >
                            <Picker.Item label="HS" value="HS" />
                            <Picker.Item label="MS" value="MS" />
                            <Picker.Item label="College" value="College" />
                        </Picker>
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
            </ScrollView>
        );
    }
}