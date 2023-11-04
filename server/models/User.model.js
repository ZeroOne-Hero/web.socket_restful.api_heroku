const mongoose = require('mongoose');

// Define the schema for the User model.
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Create a model from the schema. A model is a compiled version of the schema.
const User = mongoose.model('User', userSchema);

module.exports = User;
