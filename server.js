const express = require('express');
const connectDB = require('./config/database');
const cors = require("cors");
const claimRoutes = require('./routes/claimRoutes');
const policyholderRoutes = require('./routes/policyholderRoutes');
const policyRoutes = require('./routes/policyRoutes');


const app = express();
const port = 3000;
require('dotenv').config();

app.use(cors({
    origin: "*", // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,x-api-key"
}));

// Load the API keys from environment variables (ensure to set them in .env)
const apiKeys = new Set(process.env.API_KEYS.split(','));

// Middleware for API key authentication
const apiKeyAuth = (req, res, next) => {
    // Extract API key from the request header
    const apiKey = req.headers['x-api-key'];

    // Log the incoming request and the API key for debugging (you may remove this in production)
    console.log(`Incoming request with API Key: ${apiKey}`);

    // Check if API key is provided and if it's valid
    if (!apiKey) {
        return res.status(400).json({ message: 'Bad Request: API Key missing' });
    }

    if (!apiKeys.has(apiKey)) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
    }

    // If API key is valid, proceed with the request
    next();
};

// Connect to MongoDB
connectDB();

// Middleware to parse JSON data in request body
app.use(express.json());

// API key authentication for all routes (unless bypassed in certain routes)
app.use(apiKeyAuth);

// Routes
app.get('/', (req, res) =>{
    res.status(200).json({message: "I am server! working"});
} )
app.use('/claims', claimRoutes);
app.use('/policyholders', policyholderRoutes);
app.use('/policies', policyRoutes);

//monitoring



// Sample route
app.get('/', (req, res) => {
  res.send('Hello, Prometheus!');
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
