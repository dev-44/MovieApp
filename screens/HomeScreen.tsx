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
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=35cc8d5f')
        const response = await axios.get('http://www.omdbapi.com/?t=movie&apikey=35cc8d5f')
        if (response) {
          const { Title, Poster, imdbRating, Plot, imdbID } = response.data
          setMovie({
            id: imdbID,
            title: Title,
            img: Poster,
            rating: imdbRating,
            description: Plot
          })
          console.log(movie)
        }
      } catch (error) {
        console.error(error)
      }

    }

    fetchData()
  }, [])

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
