
import React from 'react';
import { View } from 'react-native';
import { Button, Text, Card } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

export default class RoomScreen extends React.Component {

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

                <Button title="Buzz" />
            </View>
        );
    }
}