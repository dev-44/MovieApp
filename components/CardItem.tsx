import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native';
import { MovieDetailsNavigationProp } from '../screens/MovieDetails';

type CardItemProps = {
    id: string;
    title: string;
    image?: string,
    description?: string;
    rating?: string;
}

const CardItem = ({ id, title, image, description, rating }: CardItemProps) => {

    const navigation = useNavigation<MovieDetailsNavigationProp>()

    const handleTap = () => {
        navigation.navigate("MovieDetails", { id })
    }
    return (
        <View style={styles.container} onTouchStart={handleTap}>
            <Text style={styles.text}>{title}</Text>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>Rating: {rating}</Text>
        </View>
    )
}

export default CardItem

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 250,
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 3,
        alignItems: 'center',
    },
    text: {
        color: 'black'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 14,
    },
})
