import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import HTML from 'react-native-render-html';

import { modeStyles } from '../styles';

/**
 * Game room message display
 */
export default class Messages extends React.PureComponent {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.messages && nextProps.messages
            ? nextProps.messages[0] != this.props.messages[0]
            : true;
    }

    tag2icon(tag) {

        let name = "";
        let color = "";
        let type = "font-awesome"

        if (tag == "buzz_correct") {
            name = 'circle-o';
            color = '#00cc00';
        }
        else if (tag == "buzz_wrong") {
            name = 'circle-o';
            color = '#cc0000';
        }
        else if (tag == "chat") {
            name = 'comment-alt';
            color = '#aaaaaa';
        }
        else if (tag == "leave") {
            name = 'door-open';
            color = '#99bbff';
            type = 'material-community'
        }
        else if (tag == "join") {
            name = 'sign-in';
            color = '#99bbff';
        }
        else {
            name = 'circle-o';
            color = 'rgba(0, 0, 0, 0)';
        }

        return <Icon
            containerStyle={{ marginRight: 5 }}
            color={color}
            name={name}
            size={15}
            type={type}
        />
    }

    render() {

        const messageData = this.props.messages ? this.props.messages.slice(0, 5) : [];

        return (
            <Card containerStyle={modeStyles[this.props.colorMode].card}>
                <FlatList
                    data={messageData}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            {this.tag2icon(item[0])}
                            <HTML
                                html={item[1]}
                                baseFontStyle={modeStyles[this.props.colorMode].cardText}
                            />
                        </View>}
                />
            </Card>
        );
    }
}