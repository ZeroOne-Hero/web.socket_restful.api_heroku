const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

// When a POST request is made to '/resource', the 'postUser' controller function is called.
router.post('/resource', UserController.postUser);

// When a GET request is made to '/resource', the 'getUsers' controller function is called.
router.get('/resource', UserController.getUsers);

// When a DELETE request is made to '/resource/:id', the 'deleteUser' controller function is called.
// ':id' is a route parameter that will be used to identify the user to be deleted.
router.delete('/resource/:id', UserController.deleteUser);

module.exports = router;
