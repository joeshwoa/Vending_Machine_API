const productService = require('../services/productService');

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// Get product by ID
const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

// Update product by ID
const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const productData = req.body;
        const updatedProduct = await productService.updateProduct(productId, productData);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// Delete product by ID
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await productService.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
