import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextStyle, View, ViewStyle, ImageStyle, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../types';
import { getMovieById, addFavorite, removeFavorite } from '../store/movies/moviesSlice'
import { AppDispatch, RootState } from '../store';

export type MovieDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>
export type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>

type MovieDetailsProps = {
  navigation: MovieDetailsNavigationProp;
  route: MovieDetailsRouteProp;
}

const MovieDetails = ({ navigation, route }: MovieDetailsProps) => {

  const dispatch = useDispatch<AppDispatch>()
  const id = route.params?.id || ''
  const movies = useSelector((state: RootState) => state.movies)
  const { movie, isSuccess, isLoading, favorites } = movies
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      dispatch(getMovieById(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const favoriteStatusHandler = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID))
      setIsFavorite(false)
    } else {
      console.log('Movie', movie)
      dispatch(addFavorite(movie))
      setIsFavorite(true)
    }
  }, [dispatch, isFavorite, movie])

  useLayoutEffect(() => {
    if (movie.imdbID !== '') {
      navigation.setOptions({
        title: movie.Title,
        headerRight: () => {
          return (
            <Pressable onPress={favoriteStatusHandler} style={({ pressed }) => pressed && styles.pressed}>
              <Icon size={24} color="yellow" name={isFavorite ? 'star' : 'star-outline'} style={{ marginEnd: 5 }} />
            </Pressable>
          )
        }
      })
      setIsFavorite(favorites.some((item) => item.imdbID === movie.imdbID))
    }
  }, [isFavorite, navigation, favoriteStatusHandler, favorites, movie.Title, movie.imdbID])

  return (
    <>
      {(movie.imdbID !== '' && isSuccess && !isLoading) ? (
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={movie.Poster !== "N/A" ? { uri: movie.Poster } : require('../assets/denise-jans-Lq6rcifGjOU-unsplash.jpg')} style={styles.image} alt='no-image' />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{movie.Title}</Text>
              <Text style={styles.year}>{`(${movie.Year})`}</Text>
              <Text style={styles.country}>{movie.Country}</Text>
            </View>


          </View>

          <View style={styles.text}>
            <Text style={styles.description}>{movie.Plot}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}><Text style={styles.boldText}>Actors: </Text>{movie.Actors}</Text>
            <Text style={styles.footerText}><Text style={styles.boldText}>Director: </Text>{movie.Director}</Text>
            <Text style={styles.footerText}><Text style={styles.boldText}>Genre: </Text>{movie.Genre}</Text>
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

interface Styles {
  card: ViewStyle;
  header: ViewStyle;
  image: ImageStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  year: TextStyle;
  country: TextStyle;
  text: TextStyle;
  boldText: TextStyle;
  description: TextStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  pressed: ViewStyle;
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}

const styles = StyleSheet.create<Styles>({
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
  titleContainer: {
    flexShrink: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    flexWrap: 'wrap',
    marginTop: 30,
    marginLeft: 15,
    color: '#000',
    flexShrink: 1,
    textAlign: 'auto'
  },
  year: {
    fontSize: 12,
    fontWeight: "900",
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
    alignSelf: 'flex-start',
  },
  pressed: {
    opacity: 0.7,
  },
})