const userService = require('../services/userService');

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// Get user by ID
const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Get user token by ID
const getUserTokenById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Assuming the user object has a method to retrieve the token
        const token = user.generateAuthToken(userId);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

// Create a new user
const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// Update user by ID
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete user by ID
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, getUserById, getUserTokenById, createUser, updateUser, deleteUser };
