import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardItem from '../components/CardItem';
import axios from 'axios';

const HomeScreen = () => {

  const [movie, setMovie] = useState({
    id: '',
    img: '',
    title: '',
    rating: '',
    description: ''
  })

  useEffect(() => {
    //Llamar a la API
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(movie)
  }, [movie])

  return (
    <View style={styles.container}>
      <CardItem id={movie.id} key={movie.id} title={movie.title} image={movie.img} description={movie.description} rating={movie.rating} />
    </View >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
