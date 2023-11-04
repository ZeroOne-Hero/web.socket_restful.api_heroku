// This is a middleware function for handling errors in API routes.
const apiErrorHandler = (err, req, res, next) => {
    // Log the error details to the server's console for debugging purposes.
    console.error(`API error: ${err.message}`);

    // Respond to the client with a 500 Internal Server Error status code
    // and a JSON object that contains an error message.
    res.status(500).send({error: 'Internal Server Error'});
};

module.exports = {
    apiErrorHandler,
};
