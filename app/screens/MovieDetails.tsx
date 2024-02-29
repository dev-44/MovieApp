import React, { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types';
import { getMovieById } from '../store/movies/moviesSlice'
import { AppDispatch, RootState } from '../store';

export type MovieDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>
export type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>

type MovieDetailsProps = {
  navigation: MovieDetailsNavigationProp;
  route: MovieDetailsRouteProp;
}

const MovieDetails = ({ navigation, route }: MovieDetailsProps) => {

  const dispatch = useDispatch<AppDispatch>()
  const { id } = route.params
  const { movie, isSuccess, isLoading } = useSelector((state: RootState) => state.movies)

  useEffect(() => {
    navigation.setOptions({ title: movie.Title })
    dispatch(getMovieById(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {(movie.imdbID !== '' && isSuccess) ? (
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={{ uri: movie.Poster }} style={styles.image} />
            <View>
              <Text style={styles.title}>{movie.Title}</Text>
              <Text style={styles.year}>{`(${movie.Year})`}</Text>
              <Text style={styles.country}>{movie.Country}</Text>
            </View>


          </View>

          <View style={styles.text}>
            <Text style={styles.description}>{movie.LongPlot}</Text>
            {/* <Text style={styles.content}>{article.content}</Text> */}

          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}><Text style={styles.boldText}>Actors: </Text>{movie.Actors}</Text>
            <Text style={styles.footerText}><Text style={styles.boldText}>Director: </Text>{movie.Director}</Text>
            <Text style={styles.footerText}><Text style={styles.boldText}>Genre: </Text>{movie.Genre}</Text>
            {/* <Text
                style={styles.link}
                onPress={() => Linking.openURL(url)}
            >
                {url}
            </Text> */}
          </View>
        </View>
      ) : null}
      {isLoading ? (
        <ActivityIndicator size="large" color='#0B6FC7' />
      ) : null}
    </>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 30,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowRadius: 6,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    flexShrink: 1,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    marginTop: 30,
    // marginBottom: 4,
    marginLeft: 15,
    color: '#000',
    flexShrink: 1,
    textAlign: 'justify'
  },
  year: {
    fontSize: 12,
    fontWeight: "900",
    // marginTop: 5,
    marginLeft: 15,
    color: '#000',
    flexShrink: 1,
    textAlign: 'justify'
  },
  country: {
    fontSize: 10,
    fontWeight: "900",
    marginTop: 5,
    marginLeft: 15,
    color: '#000',
    flexShrink: 1,
    textAlign: 'justify'
  },
  text: {
    flexShrink: 1,
    marginTop: 15,
  },
  boldText: {
    fontWeight: '800'
  },
  description: {
    fontSize: 14,
    color: "#575757",
    fontStyle: 'italic',
    textAlign: 'justify'
  },
  footer: {
    flexShrink: 1,
    marginTop: 15,
  },
  footerText: {
    fontSize: 12,
    color: "#575757",
    marginTop: 10,
    alignSelf: 'flex-end',
  },
})