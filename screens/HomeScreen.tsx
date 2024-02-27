import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardItem from '../components/CardItem';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CardItem title='Prueba' key={1} />
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
