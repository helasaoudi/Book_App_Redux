// types.ts
import { StackNavigationProp } from '@react-navigation/stack';

// Définition du type des paramètres du Stack
// types.ts
export type RootStackParamList = {
    BookList: undefined;
    BookForm: { book?: any };  // Paramètre 'book' est optionnel
  };
  

// Définir les types pour BookList
export type BookListNavigationProp = StackNavigationProp<RootStackParamList, 'BookList'>;
