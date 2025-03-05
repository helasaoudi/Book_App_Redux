
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

type Book = {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  author?: string;
};

export default function BookListScreen({ navigation }: { navigation: any }) {
  const [books, setBooks] = useState<Book[]>([]);

  // Fonction pour charger les livres depuis le serveur
  const loadBooks = async () => {
    try {
      const response = await fetch('http://192.168.1.13:3000/books');
      const data = await response.json();
      setBooks(data);
      console.log("data",data) // Assurez-vous que la clé 'books' existe dans la réponse du serveur
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  // Utiliser useEffect pour charger les livres lors du montage du composant
  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Liste des Livres</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetailsBook', { book: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  listContent: {
    paddingBottom: 16,
  },
});
