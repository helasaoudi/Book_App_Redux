import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBook } from './features/booksSlice';

const AddBookScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddBook = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }

    const newBook = { title, description, image, price, author };
    dispatch(addBook(newBook));
    navigation.navigate('BookList');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="URL de l'image"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TextInput
        placeholder="Prix"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />
      <TextInput
        placeholder="Auteur"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <Button title="Ajouter le livre" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 10,
  },
});

export default AddBookScreen;