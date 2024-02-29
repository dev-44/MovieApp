import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import CardItem from './CardItem'
import { Movie } from '../types';

type ResultsListProps = {
    title: string;
    result: Movie;
}

const ResultsList = ({ title, result }: ResultsListProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.resultText}>Resultados: {result.imdbID !== '' ? 1 : 0}</Text>
            <CardItem {...result} />
        </View>
    )
}

export default ResultsList

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5,
        color: 'black'
    },
    resultText: {
        marginLeft: 15,
        color: 'black'
    }
})