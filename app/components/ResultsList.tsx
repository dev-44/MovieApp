import { StyleSheet, Text, View, FlatList, ActivityIndicator, ViewStyle, TextStyle } from 'react-native'
import React, { useRef, useState } from 'react'
import CardItem from './CardItem'
import { Movie } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import moviesService from '../store/movies/moviesService'
import axios from 'axios';

type ResultsListProps = {
    title: string;
}

const ResultsList = ({ title }: ResultsListProps) => {

    const movies = useSelector((state: RootState) => state.movies);
    const { searchName, searchYear, moviesList, totalResults } = movies

    const [moviesData, setMoviesData] = useState<Movie[]>(moviesList)
    const [loading, setLoading] = useState<boolean>(false)

    const pageRef = useRef(1);

    const renderMovieItem = ({ item }: any) => {
        return <CardItem {...item} />
    }

    const fetchData = async () => {
        try {
            const data = await moviesService.getMovies(searchName, searchYear, pageRef.current);
            if (data.Response === 'True') {
                setMoviesData((prevState) => [...prevState, ...data.Search])
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleEndReached = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 3000)
        pageRef.current = pageRef.current + 1;
        if (moviesData.length < totalResults) {
            fetchData();
        }

    };

    const renderFooter = () => {
        if (loading) {
            return (
                <View style={styles.footerLoader}>
                    <ActivityIndicator size="large" color='#0B6FC7' />
                </View>
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

interface Styles {
    container: ViewStyle;
    titleStyle: TextStyle;
    resultsContainer: ViewStyle;
    resultText: TextStyle;
    footerLoader: ViewStyle;
    [key: string]: ViewStyle | TextStyle;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        marginBottom: 10,
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
    },
    footerLoader: {
        height: 50,
    }

})