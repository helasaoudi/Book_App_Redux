import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  BookList: { newBook?: Book };
  AddBook: undefined;
};

type Book = {
  id: number;
  title: string;
  description: string;
  image?: string;
  price:number;
  author:string;
};

type AddBookScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddBook'>;

const AddBookScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');


  const navigation = useNavigation();

  const handleAddBook = async () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.13:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image,price,author }),
      });

      const newBook = await response.json();

      Alert.alert('Succès', 'Le livre a été ajouté avec succès');

      navigation.navigate('BookList', { newBook });
    } catch (error) {
      console.error('Error adding book:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du livre');
    }
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
        placeholder="author"
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