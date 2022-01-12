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
export const putDb = async (id, content) => {
  try {
    console.log('Saving content to the database.');

    // Create connection
    const jateDb = await openDB('jate', 1);

    // Create a new transaction and specify the database with data privileges.
    const tx = jateDb.transaction('jate', 'readwrite');

    // Open up the object store.
    const store = tx.objectStore('jate');

    // Use the .put() method on the store and pass in content.
    const request = store.put({ id, content: content });

    // Get confirmation of the request.
    const result = await request;
    console.log('data updated on the database', result);

  } catch (err) {
    console.log(`putDb not successful due to error: ${err}`);
  }
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Retrieving content from database.');

    const jateDb = await openDB('jate', 1);

    const tx = jateDb.transaction('jate', 'readonly');

    const store = tx.objectStore('jate');

    const request = store.getAll();

    const result = await request;

    console.log('result is:' + result);

    if (result) {
      valueString = result.toString();
      return valueString;
    }
  
  } catch (err) {
    console.log(`getDb not successful due to error: ${err}`);
  }
};

initdb();
