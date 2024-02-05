const resetService = require('../services/resetService');

// Reset deposit endpoint
const resetDeposit = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const resetResult = await resetService.resetDeposit(userId);
        res.json(resetResult);
    } catch (error) {
        next(error);
    }
};

module.exports = { resetDeposit };
