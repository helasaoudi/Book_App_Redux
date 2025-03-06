// app/(tabs)/Store/features/booksSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  description: string;
  image?: string;
  price?: number;
  author?: string;
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch('http://192.168.1.13:3000/books');
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des livres');
  }
  return await response.json();
});

export const addBook = createAsyncThunk('books/addBook', async (newBook: Book) => {
  const response = await fetch('http://192.168.1.13:3000/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  });
  return await response.json();
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id: number) => {
  await fetch(`http://192.168.1.13:3000/books/${id}`, { method: 'DELETE' });
  return id;
});

export const updateBook = createAsyncThunk('books/updateBook', async (book: Book) => {
  const response = await fetch(`http://192.168.1.13:3000/books/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return await response.json();
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement des livres';
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      });
  },
});

export default booksSlice.reducer; 