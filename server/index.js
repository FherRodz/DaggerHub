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
const updateDownloadBundle = require("./database/mutations/updateDownloadBundle");
const getBundleByName = require("./database/queries/getBundleByName");
const postNewDownload = require("./database/mutations/postNewDownload");

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
app.get("/getBundles", getBundles);

// Get a bundle by its unique id
app.get("/getBundleById", getBundleById);

// Get bundle by name and owner ID
app.get("/getBundleByName", getBundleByName);

// Update download on bundle
app.put("/updateDownload", updateDownloadBundle);

// Post a new entry to the BundleDownloads table
app.post("/download", postNewDownload);

// Download a bundle from S3
//TODO

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});