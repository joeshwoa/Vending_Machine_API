const buyService = require('../services/buyService');

// Buy endpoint
const buy = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId, amount } = req.body;

        const buyResult = await buyService.buy(userId, productId, amount);
        res.json(buyResult);
    } catch (error) {
        next(error);
    }
};

module.exports = { buy };
