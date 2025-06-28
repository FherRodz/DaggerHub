require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

const checkJWT = require("./authorizer");

//Database queries
const postNewBundle = require("./database/mutations/postNewBundle");
const getBundleById = require("./database/queries/getBundleById");
const getBundles = require("./database/queries/getBundles")

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

// Middleware to parse JSON
app.use(express.json());

// Post a new entry to the Bundles table
app.post('/bundle',checkJWT, postNewBundle);

// Get all bundles
app.get("/getBundles", checkJWT, getBundles);

// Get a bundle by its unique id
app.get("/getBundleById", getBundleById);

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});