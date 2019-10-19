import React from 'react';
import { FlatList, Picker, Alert, ScrollView } from 'react-native';
import { Input, Text, ListItem, Button, Card } from 'react-native-elements';

/**
 * Room screen
 */
export default class ProfileConfig extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    changeNameHandler = (text) => this.props.K.setName(text);
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

        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', margin: '2%' }}>

                <Card>
                    <Text h5>{this.props.K.url}</Text>
                </Card>

                <Card>
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

                <Card>
                    <Input
                        label="Handle"
                        value={this.props.handle}
                        onChangeText={this.changeNameHandler}
                    />

                    <FlatList
                        data={this.props.scores}
                        renderItem={({ item }) =>
                            <ListItem
                                title={"" + item[0]}
                                rightTitle={"" + item[1]}
                                bottomDivider
                            />
                        }
                    />
                </Card>

                <Card>
                    <Button title="Reset Score" buttonStyle={{ margin: 10 }} onPress={this.resetScoreHandler} />
                    <Button title="Leave Room" buttonStyle={{ margin: 10 }} />
                </Card>
            </ScrollView>
        );
    }
}