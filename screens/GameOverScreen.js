import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';

import DefaultStyles from '../constants/default-style';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';



const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                {/* <Text>The Game is over </Text>
            <Text>No of Rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text> */}

                {/* <BodyText>The Game is over </BodyText> */}
                <Text style={DefaultStyles.title}>The Game is over</Text>
                <View style={styles.imageContainer}>
                    <Image
                        // fadeDuration={1000}
                        source={require('../assets/success.png')}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>

                {/* <BodyText>No. of Rounds : {props.roundsNumber}</BodyText> */}
                {/* <Text>Number was: {props.userNumber}</Text> */}

                <BodyText>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text> </BodyText>

                {/* <Button title="NEW GAME" onPress={props.onRestart} /> */}
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:10

    },
    imageContainer: {
        // width: '80%',
        // height: 250,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        // borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        // marginVertical: 10
        marginVertical: Dimensions.get('window').height / 20,

    },

    image: {
        width: '100%',
        height: '100%',
    },

    highlight: {
        color: Colors.primary
    }
})

export default GameOverScreen;