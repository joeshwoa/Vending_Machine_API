const User = require('../models/User');

const deposit = async (userId, amount) => {
    if (!isValidAmount(amount)) {
        return 'Invalid deposit amount';
        //throw new Error('Invalid deposit amount');
    }

    const user = await User.findById(userId);
    if (!user) {
        return 'User not found';
        //throw new Error('User not found');
    }

    user.deposit += amount;
    await user.save();

    return user;
};

const isValidAmount = (amount) => {
    const validAmounts = [5, 10, 20, 50, 100];
    return validAmounts.includes(amount);
};

module.exports = { deposit };
