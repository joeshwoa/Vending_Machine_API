const Product = require('../models/Product');

// Get all products
const getAllProducts = async () => {
    return await Product.find();
};

// Get product by ID
const getProductById = async (productId) => {
    return await Product.findById(productId);
};

// Create a new product
const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};

// Update product by ID
const updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

// Delete product by ID
const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
