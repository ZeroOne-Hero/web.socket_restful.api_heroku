// Load environment variables from the .env file.
require('dotenv').config();

// Import necessary modules to set up the server.
const express = require('express');
const http = require('http');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const {apiErrorHandler} = require('./middlewares/errorHandlers');
const {initializeWebSocketServer} = require('./services/websocketService');
const loggerMiddleware = require('./middlewares/logger');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const configs = require("./configs/mongo.configs");
const cors = require('cors');

// Middlewares for parsing JSON and urlencoded data and handling CORS issues.
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// Middleware for logging each HTTP request to the console.
app.use(loggerMiddleware);

// Initialize the WebSocket server with the HTTP server.
initializeWebSocketServer(server);

// Routing HTTP requests to '/api' to the apiRouter.
app.use('/api', userRoutes);

// Serve static files from the 'app' directory, typically used for front-end assets.
app.use(express.static(path.join(__dirname, '..', 'app')));

// Respond with the main HTML file when the root URL is accessed.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app', 'index.html'));
});

// Error handling middleware to catch any API errors.
app.use(apiErrorHandler);

// Set the port for the server to listen on.
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the connection URL from the configuration file.
mongoose.connect(configs.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB.');

        // Start the server after successful database connection.
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        // If the database connection fails, log the error and exit the process.
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    });
