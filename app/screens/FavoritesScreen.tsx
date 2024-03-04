import { StyleSheet, Text, View, FlatList, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import CardItem from '../components/CardItem';
import { Movie } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const FavoritesScreen = () => {

    const movies = useSelector((state: RootState) => state.movies);
    const { favorites } = movies

    const renderMovieItem = ({ item }: any) => {
        return <CardItem {...item} />
    }

    return (

        <View style={styles.container}>
            {favorites.length === 0 ? <Text style={styles.titleStyle}>Aún no hay favoritos</Text> : (
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.imdbID}
                        renderItem={renderMovieItem}
                    />
                </View>
            )}

        </View>

    )
}

export default FavoritesScreen

interface Styles {
    container: ViewStyle;
    titleStyle: TextStyle;
    resultsContainer: ViewStyle;
    [key: string]: ViewStyle | TextStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        marginTop: 8,
        marginBottom: 30,
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
})