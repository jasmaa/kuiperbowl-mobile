
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
        this.K = new Kuiperbowl("wss://kuiperbowl.com/game/test", ()=>console.log("callback"));
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column", margin: "2%" }}>

                <ProgressBar progress={0.8} width={null} height={10} />

                <View style={{ flex: 1 }}>
                    <Card title="Literature" titleStyle={{ textAlign: "left" }}>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed tristique est.
                            Donec vitae magna quis purus varius congue. Praesent ornare mi ac lectus porttitor tempor.
                            Sed quis justo tortor. Praesent lobortis lobortis magna, vitae venenatis eros imperdiet in.
                            Proin luctus sodales nunc, at ornare leo blandit in. Pellentesque mattis pretium venenatis.
                        </Text>
                    </Card>
                </View>

                <Button title="test set name" onPress={()=>this.K.setName("george")} />

                <Button title="Buzz" />
            </View>
        );
    }
}