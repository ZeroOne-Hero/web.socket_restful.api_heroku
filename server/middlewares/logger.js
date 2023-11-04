// Require the 'morgan' module, which is a HTTP request logger middleware for Node.js.
const morgan = require('morgan');

// Initialize the morgan middleware using the 'tiny' predefined format string.
// This format outputs minimal request information to the console, including:
// the method, URL, response status, and response time.
const loggerMiddleware = morgan('tiny');


module.exports = loggerMiddleware;
