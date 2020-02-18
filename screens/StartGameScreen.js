import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/input';
import BodyText from '../components/BodyText'
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
    }

    const confirmInputHandler = () => {
        const chooseNumber = parseInt(enteredValue);

        if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }

        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue))
        setEnteredValue('');
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                {/* <Text>choosen Number:{selectedNumber} </Text> */}
                <Text>You selected</Text>
                {/* <View>
                    <Text>{selectedNumber}</Text>
                </View> */}
                <NumberContainer>{selectedNumber}</NumberContainer>
                {/* <Button
                    title="START GAME"
                    onPress={props.onStartGame.bind(this, selectedNumber)}
                /> */}

                {/* <Button title="START GAME" onPress={()=>onStartGame(selectedNumber)}/> */}

                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        )

    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                {/* <View style={styles.inputContainer}> */}
                <Card style={styles.inputContainer}>
                    {/* <Text style={styles.text}>Select a Number </Text> */}
                    <BodyText>Select a Number</BodyText>
                    {/* <TextInput /> */}
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {/* </View> */}
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'

    },

    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        // shadowColor: 'black',
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowRadius: 6,
        // shadowOpacity: 0.26,
        // elevation: 5,
        // backgroundColor: 'white',
        // padding: 20,
        // borderRadius: 10
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15

    },

    // button:{
    //     width:0
    // }

    input: {
        width: 50,
        textAlign: 'center'
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',

    },
    text: {
        fontFamily: 'open-sans'
    }



})

export default StartGameScreen;