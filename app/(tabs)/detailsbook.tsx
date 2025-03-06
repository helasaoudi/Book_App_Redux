import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DetailsBookScreen = ({ route, navigation }) => {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Text style={styles.price}>Prix: {book.price} DTN</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart', { book, quantity: 0 })}
      >
        <Text style={styles.buttonText}>Ajouter au panier</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f5b8ef',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f5b8ef',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DetailsBookScreen;