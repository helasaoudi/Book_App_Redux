// app/(tabs)/Store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice'; // Assurez-vous que le chemin est correct

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;