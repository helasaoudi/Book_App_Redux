import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  BookList: { newBook?: Book };
  AddBook: undefined;
};

type Book = {
  id: number;
  title: string;
  description: string;
  image?: string;
};
type BookListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookList'>;
type BookListScreenRouteProp = RouteProp<RootStackParamList, 'BookList'>;

const BookListAdmin = () => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const navigation = useNavigation();
  const route = useRoute(); // Ajouter cette ligne pour accéder aux paramètres de route

  // Charger les livres à chaque fois que l'écran devient actif
  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, [])
  );

  // Charger la liste des livres
  const loadBooks = async () => {
    try {
      const response = await fetch('http://192.168.1.13:3000/books');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des livres');
      }
      const data = await response.json();
      setBooksList(data);
    } catch (error) {
      console.error('Erreur lors du chargement des livres:', error);
      Alert.alert('Erreur', 'Impossible de charger les livres.');
    }
  };

  // Ajouter un livre si un nouveau livre est passé en paramètre
  useEffect(() => {
    if (route.params?.newBook) {
      setBooksList((prevBooks) => [...prevBooks, route.params.newBook]);
    }
  }, [route.params?.newBook]);

  // Supprimer un livre
  const handleDeleteBook = async (id: number) => {
    Alert.alert('Confirmer la suppression', 'Êtes-vous sûr de vouloir supprimer ce livre ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            await fetch(`http://192.168.1.13:3000/books/${id}`, { method: 'DELETE' });
            loadBooks();
          } catch (error) {
            console.error('Erreur lors de la suppression du livre:', error);
          }
        },
      },
    ]);
  };

  // Modifier un livre
  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
    setNewTitle(book.title);
    setNewDescription(book.description);
    setModalVisible(true);
  };

  // Sauvegarder les changements
  const handleSaveChanges = async () => {
    if (currentBook) {
      try {
        await fetch(`http://192.168.1.13:3000/books/${currentBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            image: currentBook.image || '', // Assurer qu'on ne passe pas une valeur indéfinie pour l'image
          }),
        });

        setModalVisible(false);
        loadBooks();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du livre:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={booksList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEditBook(item)}>
                <FontAwesome name="edit" size={24} color="#87CEEB" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteBook(item.id)}>
                <FontAwesome name="trash" size={24} color="red" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier le livre</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Titre"
            />
            <TextInput
              style={styles.input}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Description"
            />
            <Button title="Enregistrer" onPress={handleSaveChanges} />
            <Button title="Annuler" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBook')}
      >
        <FontAwesome name="plus-circle" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#87CEEB',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 10,
  },
});

export default BookListAdmin;
