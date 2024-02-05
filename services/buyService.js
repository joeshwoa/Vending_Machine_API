const User = require('../models/User');
const Product = require('../models/Product');

const buy = async (userId, productId, amount) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    const totalCost = product.cost * amount;
    if (user.deposit < totalCost) {
        throw new Error('Insufficient funds');
    }

    if (product.amountAvailable < amount) {
        throw new Error('Product not available in requested quantity');
    }

    user.deposit -= totalCost;
    product.amountAvailable -= amount;

    await Promise.all([user.save(), product.save()]);

    const change = user.deposit;
    return {
        totalSpent: totalCost,
        purchasedProducts: { productId: product._id, productName: product.productName, quantity: amount },
        change: change
    };
};

module.exports = { buy };
