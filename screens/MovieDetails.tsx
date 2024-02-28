import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import axios from 'axios'

export type MovieDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieDetails'>
export type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>

export type RootStackParamList = {
  HomeScreen: undefined,
  MovieDetails: {
    id: string;
    title?: string;
    image?: string,
    description?: string;
  }
}

type MovieDetailsProps = {
  navigation: MovieDetailsNavigationProp;
  route: MovieDetailsRouteProp;
}

const MovieDetails = ({ navigation, route }: MovieDetailsProps) => {

  return (
    <View>
      <Text>MovieDetails</Text>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})