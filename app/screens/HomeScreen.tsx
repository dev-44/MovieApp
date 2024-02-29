import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getMovie } from '../store/movies/moviesSlice'
import { AppDispatch, RootState } from '../store';
import ResultsList from '../components/ResultsList';
import SearchBar from '../components/SearchBar';

type TitleType = 'Busqueda por Nombre' | 'Busqueda por Nombre y Año' | '';
const HomeScreen = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { movie, isLoading, isError, isSuccess, isFinished } = useSelector((state: RootState) => state.movies);

  const [movieName, onChangeMovieName] = useState<string>('');
  const [movieYear, onChangeMovieYear] = useState<string>('');
  const [title, setTitle] = useState<TitleType>('');

  useEffect(() => {
    if (isSuccess) {
      if (movieName.length > 0) {
        if (movieYear.length > 0) {
          setTitle('Busqueda por Nombre y Año')
        } else {
          setTitle('Busqueda por Nombre')
        }
      }
    }
  }, [isSuccess, movieName.length, movieYear.length])

  const onSubmitSearchByName = () => {

    const movieData = {
      name: movieName,
      year: movieYear
    }
    dispatch(getMovie(movieData));
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <SearchBar name={movieName} year={movieYear} onChangeName={onChangeMovieName} onChangeYear={onChangeMovieYear} onSubmit={onSubmitSearchByName} />
          {isFinished && movie.imdbID ? (
            <ResultsList result={movie} title={title} />
          ) : (isFinished && (!movie.imdbID || !movieName)) ? <Text style={styles.text}>No se encontraron resultados</Text> : null}
          {isLoading ? <ActivityIndicator size="large" color='#0B6FC7' /> : null}
          {(!isFinished && !movie.imdbID && !isLoading) ? (
            <View style={styles.welcomeText}>
              <Icon name='ticket-alt' size={30} color="black" style={styles.icon} />
              <Text style={styles.text}>Busque una pelicula</Text>
            </View>
          ) : null}
        </View >
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  welcomeText: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10
  }
});
