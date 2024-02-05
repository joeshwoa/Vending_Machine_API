const User = require('../models/User');

// Get all users
const getAllUsers = async () => {
    return await User.find();
};

// Get user by ID
const getUserById = async (userId) => {
    return await User.findById(userId);
};

// Create a new user
const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Update user by ID
const updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

// Delete user by ID
const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
