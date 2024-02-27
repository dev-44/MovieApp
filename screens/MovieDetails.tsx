import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { RouteProp } from '@react-navigation/native'
import axios from 'axios'

type MovieDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieDetails'>
type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>

type MovieDetailsProps = {
  navigation: MovieDetailsNavigationProp;
  route: MovieDetailsRouteProp;
}

const MovieDetails = ({ navigation, route }: MovieDetailsProps) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=35cc8d5f')
        if (response) {
          console.log(response)
        }
      } catch (error) {
        console.error(error)
      }

    }

    fetchData()
  }, [])

  return (
    <View>
      <Text>MovieDetails</Text>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})