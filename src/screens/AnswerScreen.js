
import React from 'react';
import { View } from 'react-native';
import { Text, Card, Input } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

import { styles, BootstrapColors } from '../styles';

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
            return <ProgressBar
                        progress={this.state.buzzProgress}
                        width={null} height={10}
                        color={BootstrapColors.DANGER}
                    />
        }
        else {
            return <ProgressBar
                        progress={this.state.contentProgress}
                        width={null}
                        height={10}
                        color={BootstrapColors.SUCCESS}
                    />
        }
    }

    render() {

        return (
            <View style={styles.container}>
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