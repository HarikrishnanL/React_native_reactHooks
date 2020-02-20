import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-style';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';




const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor((Math.random() * (max - min)) + min);
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    // const [rounds, setRounds] = useState(0);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'you know that this is wrong..', [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])

    };

    return (
        <View style={styles.screen} >
            <Text style={DefaultStyles.bodyText}>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>

            <Card style={styles.buttonContainer}>
                {/* <Button
                    title='LOWER'
                    onPress={nextGuessHandler.bind(this, 'lower')}
                /> */}
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    {/* LOWER */}
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                {/* <Button
                    title='GREATER'
                    onPress={nextGuessHandler.bind(this, 'greater')}
                /> */}
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    {/* GREATER */}
                    <Ionicons name="md-add" size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },

    listItem: {
        borderColor: '#ccc',
        padding: 15,
        borderWidth: 1,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:'100%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    }

});

export default GameScreen;