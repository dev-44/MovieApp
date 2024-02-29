import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, Touchable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MovieDetailsNavigationProp } from '../screens/MovieDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CardItemProps = {
    imdbID: string;
    Title: string;
    Poster: string;
    Year: string;
}

const CardItem = (props: CardItemProps) => {
    const { imdbID, Title, Poster, Year } = props
    const navigation = useNavigation<MovieDetailsNavigationProp>()

    const handleTap = () => {
        navigation.navigate("MovieDetails", { id: imdbID })
    }
    return (
        <TouchableOpacity onPress={handleTap}>
            <View style={styles.card}>
                <Image source={Poster !== "N/A" ? { uri: Poster } : require('../assets/denise-jans-Lq6rcifGjOU-unsplash.jpg')} style={styles.image} alt='no-image' />

                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{Title}</Text>
                    </View>
                    <View style={styles.yearContainer}>
                        <Text style={styles.year}>{Year}</Text>
                    </View>
                </View>


            </View>
        </TouchableOpacity>
    )
}

export default CardItem

const styles = StyleSheet.create({
    card: {
        borderRadius: 28,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        elevation: 8,
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexShrink: 1,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        flexShrink: 1,
        textAlign: 'center',
    },
    yearContainer: {
        flexShrink: 1,
    },
    year: {
        flexShrink: 1,
        color: 'black',
    },
    text: {
        color: 'black',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 14,
    },
    boldText: {
        fontWeight: 'bold',
    },


})
