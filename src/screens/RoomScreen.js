
import React from 'react';
import { View, Keyboard, StatusBar } from 'react-native';
import { Button, Text, Card } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Drawer from 'react-native-drawer';
import CacheStore from 'react-native-cache-store';

import { Messages, ProfileConfig } from '../components/';
import Kuiperbowl from '../networking/Kuiperbowl';
import { styles, BootstrapColors, modeStyles } from '../styles';

/**
 * Room screen
 */
export default class RoomScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.K = new Kuiperbowl(this.props.navigation.getParam("roomName", "hs"), (clientState) => {
            this.setState(clientState);
        });
        this.K.init();

        this.state = {colorMode: 'light'};
        CacheStore.get("colorMode")
            .then(colorMode => {
                if(colorMode){
                    this.setState({colorMode: colorMode});   
                }
            });
    }

    componentWillUnmount() {
        this.K.deinit();
    }

    buzzHandler = () => {
        // Do buzz ownership checking here instead
        if (this.K.buzz()) {
            this.props.navigation.navigate('Answer', { K: this.K, colorMode: this.state.colorMode });
        }
    }

    swipeHandler = (gestureName, gestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
                if (!this._drawer._open) {
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

    leaveRoomHandler = () => {
        this.props.navigation.goBack();
    }

    colorModeSwitchHandler = () => {
        const newColorMode = this.state.colorMode == 'light' ? 'dark' : 'light'
        CacheStore.set("colorMode", newColorMode);
        this.setState({ colorMode: newColorMode });
    }

    render() {
        const isContest = this.state.game_state == 'contest';
        const isIdle = this.state.game_state == 'idle';
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={this.swipeHandler}
                config={config}
                style={modeStyles[this.state.colorMode].body}
            >
                <StatusBar hidden />
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
                            leaveRoomHandler={this.leaveRoomHandler}
                            colorMode={this.state.colorMode}
                            colorModeSwitchHandler={this.colorModeSwitchHandler}
                        />
                    }
                >
                    <View style={styles.container}>
                        <ProgressBar
                            progress={isContest ? this.state.buzzProgress : this.state.contentProgress}
                            width={null} height={10}
                            color={isContest ? BootstrapColors.DANGER : BootstrapColors.SUCCESS}
                        />

                        <Card
                            title={isIdle ? this.state.category + "\n" + this.state.answer_heading : this.state.category}
                            titleStyle={{...modeStyles[this.state.colorMode].cardText, textAlign: "left"}}
                            containerStyle={modeStyles[this.state.colorMode].card}
                        >
                            <Text style={modeStyles[this.state.colorMode].cardText}>
                                {isIdle ? this.state.question : this.state.curr_question_content}
                            </Text>
                        </Card>

                        <View style={{ flex: 1 }}></View>
                        <Messages messages={this.state.messages} colorMode={this.state.colorMode} />

                        <Button title="Buzz" buttonStyle={{ margin: 20 }} onPress={this.buzzHandler} />
                    </View>

                </Drawer>
            </GestureRecognizer >
        );
    }
}