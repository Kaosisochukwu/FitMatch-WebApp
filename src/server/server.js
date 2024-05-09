/**
 * Counter Management Server Module
 *
 * This module provides a comprehensive suite of functionalities for managing
 * counter data via HTTP requests. It leverages a set of core operations
 * including creating, reading, updating, and deleting counters, along with a
 * functionality to dump all counters. These operations are exposed through a
 * basic HTTP server setup that routes incoming requests to the appropriate
 * action based on the URL path and query parameters.
 *
 * Core Functionalities:
 * - `createCounter(response, name)`: Creates a new counter with a specified
 *   name. If the name is not provided, it responds with a 400 status code
 *   indicating a bad request.
 * - `readCounter(response, name)`: Reads the value of a specified counter by
 *   its name. If the counter is found, it responds with a 200 status code and
 *   the counter's value. If not, it responds with a 404 status code indicating
 *   the counter could not be found.
 * - `updateCounter(response, name)`: Updates the value of a specified counter
 *   by incrementing its count by one. Responds with a 200 status code on
 *   success or a 404 if the counter is not found.
 * - `deleteCounter(response, name)`: Deletes a specified counter by its name,
 *   responding with a 200 status code upon success or a 404 if the counter
 *   cannot be found.
 * - `dumpCounters(response)`: Dumps all counters, formatting them into an HTML
 *   response.
 * - `basicServer(request, response)`: The entry point for incoming HTTP
 *   requests. It routes the request to the appropriate counter operation based
 *   on the URL.
 *
 * Usage: This module is designed to be deployed as part of a Node.js server
 * environment. It handles HTTP requests related to counter data management,
 * making it suitable for applications requiring basic counter functionalities
 * with HTTP interfaces.
 *
 * Example: A simple use case might involve deploying this module in a Node.js
 * server and interacting with the counter operations through HTTP requests,
 * such as creating a new counter by sending a request to
 * `/create?name=myCounter` or reading a counter's value by navigating to
 * `/read?name=myCounter`.
 */

import * as http from "http";
import * as url from "url";
import * as db from "./db.js";
import * as fsp from "fs/promises";
import logger from "morgan";
import express from "express";

const app = express();
const port = 3260;
const path = require("path");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});







/**
 * Asynchronously creates a counter with the specified name. If the name is not
 * provided, it responds with a 400 status code indicating a bad request.
 * Otherwise, it saves the counter with an initial value of 0 to the database
 * and responds with a 200 status code indicating success.
 *
 * @async
 * @param {object} response - The HTTP response object used to send back data to
 * the client. It must have `writeHead`, `write`, and `end` methods available.
 * @param {string} [name] - The name of the counter to be created. If not
 * provided, the function will respond with an error message.
 */
async function createUser(response, email, password) {
  let responseData; // Variable to store the response data
  if (email === undefined) {
    responseData = "User Name Required";
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.write(responseData);
    response.end();
  } else {
    try {
      await db.saveUser(name, email, password);
      responseData = `User ${name} successfully created`;
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write(responseData);
      response.end();
    } catch (err) {
      responseData = "Internal Server Error: Unable to create user";
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(responseData);
      response.end();
    }
  }
}




/**
 * Asynchronously reads the value of a specified counter by its name. If the
 * counter is found, it responds with a 200 status code and the counter's value.
 * If the counter is not found, it catches the error and responds with a 404
 * status code indicating that the counter could not be found.
 *
 * @async
 * @param {object} response - The HTTP response object used to send data back to
 * the client. It must support `writeHead`, `write`, and `end` methods.
 * @param {string} name - The name of the counter to be read. The function
 * attempts to load a counter with this name from the database.
 * @throws {Error} - If there is an issue loading the counter (e.g., the counter
 * does not exist), an error is thrown and caught within the function. The
 * client is then informed that the counter was not found.
 */
async function readUser(response, name, password) {
  try {
    const user = await db.readUser(name, password);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(`${name}`);
    console.log(response.text());
    response.end();
  } catch (err) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write(`${name}`);
    response.end();
  }
}


 
app.listen(port, () => {
  console.log("Server started on port 3260");
});



