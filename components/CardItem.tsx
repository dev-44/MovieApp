import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CardItemProps = {
    title: string;
    image?: string,
    description?: string;
}

const CardItem = ({ title, image, description }: CardItemProps) => {

    const navigation = useNavigation()

    const handleTap = () => {
        navigation.navigate()
    }
    return (
        <View style={styles.container} onTouchStart={handleTap}>
            <Text style={styles.title}>{title}</Text>
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
    title: {
        color: 'black'
    }
})
