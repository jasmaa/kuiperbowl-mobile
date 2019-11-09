
import { StyleSheet } from 'react-native'

const light = StyleSheet.create({
    body: {
        flex: 1,
    },
    card: {},
    cardText: {},
});
const dark = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#212121",
    },
    card: {
        backgroundColor: "#303030",
        borderColor: "#424242",
    },
    cardText: {
        color: 'white',
    },
});
export const modeStyles = {
    "light": light,
    "dark": dark,
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: "2%"
    },
    homeContainer: {
        flex: 1,
        flexDirection: "column",
        margin: 10,
        justifyContent: "space-evenly",
    }
});

export const BootstrapColors = {
    DANGER: "#d9534f",
    SECONDARY: "#868e96",
    INFO: "#5bc0de",
    SUCCESS: "#5cb85c",
    PRIMARY: "#428bca",
}