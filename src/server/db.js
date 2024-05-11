/**
 * Counter Management Module
 *
 * This module provides a set of asynchronous functions for creating, reading,
 * updating, and deleting counter documents in a PouchDB database. It includes
 * utilities for manipulating individual counters by name, modifying counter
 * values, and fetching all counters stored in the database. The module is built
 * on top of PouchDB, a NoSQL database, to persist counter data.
 *
 * HOWEVER: it can easily be changed to a different data store simply by
 * replacing the PouchDB implementation with another database system.
 *
 * Functions:
 * - `saveCounter(name, count)`: Saves a new counter or updates an existing
 *   counter with the given name and count.
 * - `modifyCounter(doc)`: Updates an existing counter document in the database.
 * - `loadCounter(name)`: Retrieves a counter by its name.
 * - `removeCounter(name)`: Removes a counter from the database by its name.
 * - `loadAllCounters()`: Fetches all counters from the database.
 *
 * Dependencies:
 * - PouchDB: Used for data storage and retrieval operations. Ensure PouchDB is
 *   installed and properly configured.
 *
 * Examples of use:
 * - Creating a counter with a specific name and initial count.
 * - Updating the count of an existing counter.
 * - Fetching the current count of a counter by its name.
 * - Deleting a counter.
 * - Listing all counters stored in the database.
 *
 * Note: This module is currently works with a PouchDB database named
 * 'counters'. Make sure the database is accessible and correctly initialized
 * before using these functions.
 *
 * Note: This module can easily change the database implementation to another
 * database system by changing the import statement and the database connection
 * initialization. The rest of the functions should work as expected with minor
 * modifications.
 */
import PouchDB from "pouchdb";

const db = new PouchDB("users");

/**
 * Asynchronously saves a new counter to the database with a specified name and
 * count. If a counter with the same name already exists, it will be
 * overwritten.
 *
 * @async
 * @param {string} name - The unique identifier for the user
 * @param {string} email - The user email
 * @param {string} password - The user password
 * @returns {Promise<void>} - A promise that resolves when the counter has been
 * successfully saved.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */
export async function saveUser(user_id) {
  console.log("saveed user");
  await db.put({ _id: user_id, text: " "});
}


/**
 * Asynchronously sets the text for a user with the specified user ID.
 *
 * @async
 * @param {string} user_id - The unique identifier for the user.
 * @param {string} text - The text to set for the user.
 * @returns {Promise<void>} - A promise that resolves when the text has been
 * successfully set for the user.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */
export async function setText(user_id, text) {
  try {
    let user;
    try {
      // Retrieve the latest version of the user document
      user = await db.get(user_id);
    } catch (error) {
      if (error.status !== 404) {
        // Re-throw error if it's not a "not found" error
        throw error;
      }
      // Create a new user document if it doesn't exis
    }

    // Update the text field
    user.text = text;

    // Save the updated user document back to the database
    await db.put(user);

    console.log("Text set successfully for user:", user_id);
  } catch (error) {
    console.error("Error setting text for user:", error);
    throw new Error("Failed to set text for user");
  }
}


export async function seeAll() {
  try {
    const result = await db.allDocs({ include_docs: true });
    return result.rows; // Return the fetched documents
  } catch (error) {
    console.error('Error fetching all documents:', error);
    throw error; // Throw the error to propagate it to the caller
  }
}

/**
 * Asynchronously saves reads database with a specified name and
 * email. If a user is present it will successfully login otherwise it 
 * will throw an error
 *
 * @async
 * @param {string} name - The unique identifier for the user 
 * @param {string} email - The user email
 * @param {string} password - The user password
 * @returns {Promise<void>} - A promise that resolves when the counter has been
 * successfully saved.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */

export async function getUser(user_id) {
  try {
    const user = await db.get(user_id);
    return user; // Return the user document if found
  } catch (error) {
    if (error.name === 'not_found') {
      // User document not found
      throw new Error(`User with ID '${user_id}' not found`);
    } else {
      // Other error (e.g., database connectivity issue)
      console.error('Error fetching user document:', error);
      throw error; // Throw the error to propagate it to the caller
    }
  }
}





