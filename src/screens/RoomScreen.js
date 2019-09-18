
import React from 'react';
import { View, FlatList } from 'react-native';
import { Button, Text, Card } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import HTML from 'react-native-render-html';

import Kuiperbowl from '../networking/Kuiperbowl';

/**
 * Room screen
 */
export default class RoomScreen extends React.Component {

    constructor(props) {
        super(props);
        this.K = new Kuiperbowl("wss://kuiperbowl.com/game/test", (clientState) => {

            let time_passed = clientState.current_time - clientState.start_time;
            let duration = clientState.end_time - clientState.start_time;

            this.buzzProgress = 1.1 * clientState.buzz_passed_time / clientState.buzz_time;
            this.contentProgress = 1.05 * time_passed / duration;

            if (clientState.game_state == 'idle') {
                this.contentProgress = 0;
            }

            this.setState(clientState);
        });
        this.K.init();

        this.state = {};
        this.clientTimer = setInterval(() => this.K.update(), 100);

        this.buzzProgress = 0;
        this.contentProgress = 0;
    }

    componentWillUnmount() {
        clearInterval(this.clientTimer);
    }

    renderProgressBar() {
        if (this.state.game_state == 'contest') {
            return <ProgressBar progress={this.buzzProgress} width={null} height={10} color="#d9534f" />
        }
        else {
            return <ProgressBar progress={this.contentProgress} width={null} height={10} color="#5cb85c" />
        }
    }

    renderContent() {
        if (this.state.game_state == 'idle') {
            return (
                <Card title={this.state.category + "\n" + this.state.answer_heading} titleStyle={{ textAlign: "left" }}>
                    <Text>{this.state.question}</Text>
                </Card>
            );
        }
        else {
            return (
                <Card title={this.state.category} titleStyle={{ textAlign: "left" }}>
                    <Text>{this.state.curr_question_content}</Text>
                </Card>
            );
        }
    }

    renderMessages() {

        let messageData = null;
        if(this.state.messages){
            messageData = this.state.messages.slice(0, 10);
        }

        return (
            <Card>
                <FlatList
                    data={messageData}
                    renderItem={({ item }) => <HTML html={item[1]} />}
                />
            </Card>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column", margin: "2%" }}>

                {this.renderProgressBar()}

                <View style={{ flex: 1 }}>
                    {this.renderContent()}
                    {this.renderMessages()}
                </View>

                <Button title="Buzz" onPress={this.K.buzz()}/>
            </View>
        );
    }
}