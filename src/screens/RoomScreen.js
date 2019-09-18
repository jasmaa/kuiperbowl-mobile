
import React from 'react';
import { View } from 'react-native';
import { Button, Text, Card } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import Kuiperbowl from '../networking/Kuiperbowl';

/**
 * Room screen
 */
export default class RoomScreen extends React.Component {

    constructor(props){
        super(props);
        this.K = new Kuiperbowl("wss://kuiperbowl.com/game/test", (clientState)=>{
            this.setState(clientState);
        });
        this.K.init();

        this.state = {};

        this.clientTimer = setInterval(()=>this.K.update(), 100);
    }

    componentWillUnmount(){
        clearInterval(this.clientTimer);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column", margin: "2%" }}>

                <ProgressBar progress={0.8} width={null} height={10} />

                <View style={{ flex: 1 }}>
                    <Card title={this.state.category} titleStyle={{ textAlign: "left" }}>
                        <Text>{this.state.curr_question_content}</Text>
                    </Card>
                </View>

                <Button title="test set name" onPress={()=>this.K.setName("george")} />

                <Button title="Buzz" />
            </View>
        );
    }
}