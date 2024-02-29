import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MovieDetailsNavigationProp } from '../screens/MovieDetails';

type CardItemProps = {
    imdbID: string;
    Title: string;
    Poster: string;
    Plot: string;
    imdbRating: string;
}

const CardItem = (props: CardItemProps) => {
    const { imdbID, Title, Poster, Plot, imdbRating } = props
    const navigation = useNavigation<MovieDetailsNavigationProp>()

    const handleTap = () => {
        navigation.navigate("MovieDetails", { id: imdbID })
    }
    return (
        <View style={styles.card} onTouchStart={handleTap}>
            <Image source={{ uri: Poster }} style={styles.image} alt='no-image' />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{Title}</Text>
                </View>


                <View style={styles.plotContainer}>
                    <Text style={styles.plot}>{Plot}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.text}><Text style={styles.boldText}>Rating: </Text>{imdbRating}</Text>
                </View>
            </View>


        </View>
    )
}

export default CardItem

const styles = StyleSheet.create({
    card: {
        //height: 120,
        borderRadius: 28,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        elevation: 8,
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginLeft: 10,
        flexShrink: 1,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    plotContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    plot: {
        color: 'black',
        textAlign: 'justify',
    },
    text: {
        color: 'black',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 14,
    },
    ratingContainer: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    container: {
        flexShrink: 1,
    },

})
