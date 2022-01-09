import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('Saving content to the database.');

    // Create connection
    const jateDb = await openDB('jate', 1);

    // Create a new transaction and specify the database with data privileges.
    const tx = jateDb.transaction('jate', 'readwrite');

    // Open up the object store.
    const store = tx.objectStore('jate');

    // Use the .add() method on the store and pass in content.
    const request = store.add({ content: content });

    // Get confirmation of the request.
    const result = await request;
    console.log('data saved to the database', result);

  } catch (err) {
    console.error(`putDb not successful due to error: ${err}`);
  }
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Retrieving content from database.');

    // Create connection
    const jateDb = await openDB('jate', 1);

    // Create a new transaction and specify the database with data privileges.
    const tx = jateDb.transaction('jate', 'readonly');

    // Open up the object store.
    const store = tx.objectStore('jate');

    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();

    // Get confirmation of the request.
    const result = await request;
    console.log('Results:', result);
    return result;
  } catch (err) {
    console.error(`getDb not successful due to error: ${err}`);
  }
};

initdb();
