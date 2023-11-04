// Import the UserService which contains the business logic for handling user data.
const UserService = require('../services/userService');

// Handle HTTP POST request to create a new user.
const postUser = async (req, res) => {
    try {
        // Call the UserService to create a user with the request data.
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Handle HTTP GET request to retrieve all users.
const getUsers = async (req, res) => {
    try {
        // Call the UserService to get an array of all users.
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Handle HTTP DELETE request to delete a user by their ID.
const deleteUser = async (req, res) => {
    try {
        // Call the UserService to delete a user based on the ID provided in the route parameter.
        const result = await UserService.deleteUserById(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.json({ message: 'Resource deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Export the controller functions to use them in the route definitions.
module.exports = {
    postUser,
    getUsers,
    deleteUser
};
