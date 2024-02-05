const User = require('../models/User');

const resetDeposit = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return 'User not found';
        //throw new Error('User not found');
    }

    user.deposit = 0;
    await user.save();

    return user;
};

module.exports = { resetDeposit };
