
import React from 'react';
import { View, Keyboard } from 'react-native';
import { Button, Text, Card } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Drawer from 'react-native-drawer';

import { Messages, ProfileConfig } from '../components/';
import Kuiperbowl from '../networking/Kuiperbowl';

/**
 * Room screen
 */
export default class RoomScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.K = new Kuiperbowl("wss://kuiperbowl.com/game/test9", (clientState) => {

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
        this.updateTimer = setInterval(() => this.K.update(0.1), 100);
        this.pingTimer = setInterval(() => this.K.ping(), 5000);

        this.buzzProgress = 0;
        this.contentProgress = 0;
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
        clearInterval(this.pingTimer);
    }

    buzzHandler = () => this.K.buzz();

    swipeHandler = (gestureName, gestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
                if(!this._drawer._open){
                    this.K.next();
                }
                break;
            case SWIPE_RIGHT:
                this._drawer.open();
                break;
            case SWIPE_LEFT:
                this._drawer.close();
                break;

        }
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

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={this.swipeHandler}
                config={config}
                style={{ flex: 1 }}
            >
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    openDrawerOffset={0.2}
                    type="overlay"
                    tapToClose={true}
                    onClose={Keyboard.dismiss}
                    styles={{
                        drawer: { flex: 1, backgroundColor: "white" },
                    }}
                    tweenHandler={(ratio) => ({
                        main: { opacity: (2 - ratio) / 2 }
                    })}
                    tweenDuration={100}
                    content={
                        <ProfileConfig 
                            K={this.K}
                            handle={this.state.player_name}
                            difficulty={this.state.difficulty}
                            category={this.state.room_category}
                            scores={this.state.scores}
                        />
                    }
                >
                    <View style={{ flex: 1, flexDirection: "column", margin: "2%" }}>
                        {this.renderProgressBar()}
                        {this.renderContent()}
                        <View style={{ flex: 1 }}></View>
                        <Messages messages={this.state.messages} />

                        <Button title="Buzz" buttonStyle={{ margin: 20 }} onPress={this.buzzHandler} />
                    </View>

                </Drawer>
            </GestureRecognizer >
        );
    }
}