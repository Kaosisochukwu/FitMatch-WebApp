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
export async function saveUser(email, password) {
  await db.put({ _id: email, password: password});
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

export async function readUser(searchName, searchPassword) {
  return new Promise((resolve, reject) => {
    db.find({
      selector: {
        $or: [
          { $and: [
              { name: { $eq: searchName } },
              { password: { $eq: searchPassword } }
            ]
          },
          { $and: [
              { email: { $eq: searchName } },
              { password: { $eq: searchPassword } }
            ]
          }
        ]
      }
    }).then(function(result) {
      if (result.docs.length > 0) {
        // Return the ID of the first matching document
        resolve(result.docs[0]._id);
      } else {
        // No matching document found
        reject(new Error('User not found'));
      }
    }).catch(function(err) {
      // Handle errors
      reject(err);
    });
  });
}







