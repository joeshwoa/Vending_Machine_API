const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const depositController = require('../controllers/depositController');
const buyController = require('../controllers/buyController');
const resetController = require('../controllers/resetController');
const authenticateToken = require('../middleware/authenticateToken');

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.get('/userToken/:userId', userController.getUserTokenById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);


// Product routes
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

// Deposit route
router.post('/deposit', authenticateToken, depositController.deposit);

// Buy route
router.post('/buy', authenticateToken, buyController.buy);

// Reset route
router.post('/reset', authenticateToken, resetController.resetDeposit);

module.exports = router;
//export default routes;
