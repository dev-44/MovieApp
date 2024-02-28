import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types';

export type MovieDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>
export type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>

type MovieDetailsProps = {
  navigation: MovieDetailsNavigationProp;
  route: MovieDetailsRouteProp;
}

const MovieDetails = ({ navigation, route }: MovieDetailsProps) => {

  useEffect(() => {
    console.log(route.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View>
      <Text>MovieDetails</Text>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})