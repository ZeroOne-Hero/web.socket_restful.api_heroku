// Load the dotenv library to read environment variables from the .env file.
require('dotenv').config();

const configs = {
    // The PORT property is set to the value of the PORT environment variable.
    PORT: process.env.PORT,

    // The DB_URL property is set to the value of the DB_URL environment variable.
    DB_URL: process.env.DB_URL,
};

module.exports = configs;
