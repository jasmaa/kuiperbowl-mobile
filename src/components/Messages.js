import React from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import HTML from 'react-native-render-html';

/**
 * Game room message display
 */
export default class Messages extends React.PureComponent {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.messages && nextProps.messages
                ? nextProps.messages[0] != this.props.messages[0]
                : true;
    }

    render() {
        const messageData = this.props.messages ? this.props.messages.slice(0, 5) : [];

        return (
            <Card>
                <FlatList
                    data={messageData}
                    renderItem={({ item }) => <HTML html={item[1]} />}
                />
            </Card>
        );
    }
}