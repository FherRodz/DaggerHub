require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

//Database queries
const postNewBundle = require("./database/mutations/postNewBundle");
const getBundleById = require("./database/queries/getBundleById");
const getBundles = require("./database/queries/getBundles")

// Middleware to parse JSON
app.use(express.json());

// Post a new entry to the Bundles table
app.post('/bundle', postNewBundle);

// Get all bundles
app.get("/getBundles", getBundles)

// Get a bundle by its unique id
app.get("/getBundleById", getBundleById)

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});