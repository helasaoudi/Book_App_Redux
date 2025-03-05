import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useUserContext } from './UserContext';

export default function CartScreen({ route, navigation }: { route: any, navigation: any }) {
  const { book, quantity: initialQuantity } = route.params;
  const { addToCart, cart } = useUserContext(); // Utiliser le contexte
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    // Si le livre existe déjà dans le panier, définir la quantité
    const existingBook = cart.find((item) => item.book.title === book.title);
    if (existingBook) {
      setQuantity(existingBook.quantity);
    }
  }, [cart, book.title]);

  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));

  const handleValidate = () => {
    addToCart(book, quantity); // Ajouter ou mettre à jour le panier avec le livre et la quantité
    alert(`Commande validée pour ${book.title} avec ${quantity} articles`);
    navigation.navigate('BookList'); // Rediriger vers BookList
  };

  const renderCartItem = ({ item }: { item: { book: any; quantity: number } }) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.book.image }} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item.book.title}</Text>
          <Text style={styles.cartItemPrice}>Prix: {item.book.prix} DTN</Text>
          <Text style={styles.cartItemQuantity}>Quantité: {item.quantity}</Text>
          <Text style={styles.cartItemTotal}>Total: {item.quantity * parseFloat(item.book.prix)} DTN</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Affichage de la liste des livres dans le panier */}
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.book.title}
        style={styles.cartList}
      />

      {/* Affichage du livre actuel avec son détail */}
      <View style={styles.card}>
        <Image source={{ uri: book.image }} style={styles.image} />
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.price}>Prix: {book.prix} DTN</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleValidate} style={styles.validateButton}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#f5b8ef',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  validateButton: {
    backgroundColor: '#f5b8ef',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
  },
  cartItemQuantity: {
    fontSize: 14,
    marginVertical: 4,
  },
  cartItemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5b8ef',
  },
});
