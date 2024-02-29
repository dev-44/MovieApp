import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import CardItem from './CardItem'
import { Movie } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';

type ResultsListProps = {
    title: string;
    results: Movie[];
}

const ResultsList = ({ title, results }: ResultsListProps) => {

    const [moviesData, setMoviesData] = useState(results)

    const pageRef = useRef(1);

    const { searchName, searchYear, movies, isLoading, totalResults } = useSelector((state: RootState) => state.movies);

    const renderMovieItem = ({ item }: any) => {
        return <CardItem {...item} />
    }

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`http://www.omdbapi.com/?apikey=35cc8d5f&s=${searchName}&type=movie&page=${pageRef.current}`.concat(searchYear ? `&y=${searchYear}` : ''))
            if (data.Response === 'True') {
                setMoviesData((prevState) => [...prevState, ...data.Search])
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleEndReached = () => {
        pageRef.current = pageRef.current + 1;
        if (results.length < totalResults) {
            fetchData();
        }

    };

    const renderFooter = () => {
        if (isLoading) {
            return (
                <ActivityIndicator size="large" color='#0B6FC7' />
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.resultText}>Resultados: {moviesData.length > 0 ? moviesData.length : 0}</Text>
            <View style={styles.resultsContainer}>
                <FlatList
                    data={moviesData}
                    keyExtractor={(item) => item.imdbID}
                    renderItem={renderMovieItem}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            </View>

        </View>
    )
}

export default ResultsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5,
        color: 'black'
    },
    resultsContainer: {
        marginTop: 10,
        width: '80%'
    },
    resultText: {
        color: 'black'
    }
})