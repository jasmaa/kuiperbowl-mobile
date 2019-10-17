import React from 'react';
import { View, FlatList, Picker } from 'react-native';
import { Input, Text, ListItem, Button, Divider } from 'react-native-elements';

/**
 * Room screen
 */
export default class ProfileConfig extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    changeName = (text) => this.props.K.setName(text);

    render() {

        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: '2%' }}>
                <Text h4>{this.props.K.url}</Text>
                <Divider />

                <Input
                    label="Handle"
                    onChangeText={this.changeName}
                />

                <Picker
                    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                    <Picker.Item label="Everything" value="java" />
                    <Picker.Item label="Science" value="js" />
                </Picker>
                <Picker
                    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                    <Picker.Item label="HS" value="java" />
                    <Picker.Item label="MS" value="js" />
                    <Picker.Item label="College" value="js" />
                </Picker>

                <Text h4>Scores</Text>
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

                <Button title="Leave Room" buttonStyle={{ margin: 20 }} />
            </View>
        );
    }
}