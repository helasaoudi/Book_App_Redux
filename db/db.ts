import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

// Ouvrir la base de données SQLite
const sqlite = openDatabaseSync('BooksDB.db');
const db = drizzle(sqlite);

// Fonction pour créer la table Books
const createTable = async () => {
    try {
      await db.run(
        `CREATE TABLE IF NOT EXISTS Books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          image TEXT
        )`
      );
      console.log('Table Books créée avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de la table Books:', error);
    }
  };

// Appeler la fonction pour créer la table
createTable();

export default db; // Exporte db comme export par défaut