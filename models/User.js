const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    deposit: { type: Number, default: 0 },
    role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' }
});

// Define generateAuthToken method
userSchema.methods.generateAuthToken = function() {
    // Generate JWT token using user ID and a secret key
    const token = jwt.sign({ _id: this._id }, 'your-secret-key');
    return token;
};

module.exports = mongoose.model('User', userSchema);
