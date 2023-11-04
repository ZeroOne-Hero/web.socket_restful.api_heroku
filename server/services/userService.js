const User = require('../models/User.model');

const createUser = async (userData) => {
    // Instantiate a new User with the provided data.
    const user = new User(userData);
    // Save the new User instance to the database and return the result.
    await user.save();
    return user;
};

const getAllUsers = async () => {
    // Use Mongoose's find method to retrieve all users and return the result.
    return await User.find();
};

const deleteUserById = async (userId) => {
    // Use Mongoose's deleteOne method to remove a user by their _id and return the result.
    return await User.deleteOne({_id: userId});
};

module.exports = {
    createUser,
    getAllUsers,
    deleteUserById
};
