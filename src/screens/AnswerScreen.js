
import React from 'react';
import { View, Keyboard } from 'react-native';
import { Button, Text, Card, Input } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

export default class AnswerScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {};

        this.answer = "";
        this.K = this.props.navigation.getParam('K');
        const oldCallback = this.K.updateCallback;

        this.K.updateCallback = (clientState) => {

            if (clientState.game_state != 'contest') {
                this.K.updateCallback = oldCallback
                this.props.navigation.goBack();
            }

            this.setState(clientState);
        };
    }

    submitHandler = () => {
        this.K.answer(this.answer);
    }
    changeTextHandler = (text) => {
        this.answer = text;
        this.K.autoAnswer = text;
    }

    renderProgressBar() {
        if (this.state.game_state == 'contest') {
            return <ProgressBar progress={this.state.buzzProgress} width={null} height={10} color="#d9534f" />
        }
        else {
            return <ProgressBar progress={this.state.contentProgress} width={null} height={10} color="#5cb85c" />
        }
    }

    render() {

        return (
            <View style={{ flex: 1, flexDirection: "column", margin: "2%" }}>
                {this.renderProgressBar()}
                <Input
                    label="Answer"
                    autoFocus={true}
                    onChangeText={this.changeTextHandler}
                    onSubmitEditing={this.submitHandler}
                />
                <Card>
                    <Text>{this.K.clientState.curr_question_content}</Text>
                </Card>
            </View>
        );
    }

}