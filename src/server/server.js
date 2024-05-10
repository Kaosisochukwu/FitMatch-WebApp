import logger from "morgan";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3260;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', express.static(join(__dirname, '../client')));

app.get('/seeAll', async (req, res) => {
  try {
    // Call the seeAll function from db.js
    const allDocs = await db.seeAll();
    console.log(allDocs); // Send the fetched documents as JSON response
  } catch (error) {
    console.error('Error fetching all documents:', error);
    res.status(500).send('Internal Server Error'); // Send 500 status code in case of error
  }
});



app.post('/create', async (req, res) => {
  const { user_id } = req.body;
  
  try {
    // Call the function from db.js to save the user
    console.log(user_id);
    await db.saveUser(user_id, ""); // Assuming the second parameter is optional
    
    res.status(200).send(`User ${user_id} successfully created`);
  } catch (err) {
    console.error("/create fail:", err);
    res.status(500).send("Internal Server Error: Unable to create user");
  }
});

app.listen(port, () => {
  console.log("Server started on port 3260");
});
