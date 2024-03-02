import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getMovies, reset, setSearchData } from '../store/movies/moviesSlice'
import { AppDispatch, RootState } from '../store';
import ResultsList from '../components/ResultsList';
import SearchBar from '../components/SearchBar';

type TitleType = 'Busqueda por Nombre' | 'Busqueda por Nombre y Año' | '';
const HomeScreen = () => {

  const dispatch = useDispatch<AppDispatch>()
  const movies = useSelector((state: RootState) => state.movies);
  const { moviesList, isLoading, isSuccess, isFinished } = movies

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

  const onSubmit = () => {

    const movieData = {
      name: movieName,
      year: movieYear,
    }
    dispatch(setSearchData(movieData))
    dispatch(reset())
    dispatch(getMovies({ ...movieData, page: 1 }));
  }



  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <SearchBar name={movieName} year={movieYear} onChangeName={onChangeMovieName} onChangeYear={onChangeMovieYear} onSubmit={onSubmit} />
          {isLoading ? <ActivityIndicator size="large" color='#0B6FC7' /> : moviesList.length > 0 ? (
            <ResultsList title={title} />
          ) : !isFinished ? (
            <View style={styles.welcomeText}>
              <Icon name='ticket-alt' size={30} color="black" style={styles.icon} />
              <Text style={styles.text}>Busque una pelicula</Text>
            </View>
          ) : (
            (
              <Text style={styles.text}>No se encontraron resultados</Text>
            )
          )}
        </SafeAreaView>
      </View >
    </>
  );
};

export default HomeScreen;

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  welcomeText: ViewStyle;
  icon: ViewStyle;
  [key: string]: ViewStyle | TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
