const { Console } = require('console');
const depositService = require('../services/depositService');

// Deposit endpoint
const deposit = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { amount } = req.body;

        const updatedUser = await depositService.deposit(userId, amount);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

module.exports = { deposit };
