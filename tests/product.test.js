const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Product = require('../models/Product');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product API', () => {
    let testProduct;

    before(async () => {
        // Clear products collection before running tests
        await Product.deleteMany({});
    });

    describe('POST /products', () => {
        it('should create a new product', async () => {
            const productData = { productName: 'Test Product', amountAvailable: 10, cost: 50, sellerId: '60978a5b0c2ed7447811c871' };
            const res = await chai.request(app).post('/products').send(productData);
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('productName').that.is.equal(productData.productName);
            testProduct = res.body; // Save created product for future tests
        });
    });

    describe('GET /products/:productId', () => {
        it('should return product by ID', async () => {
            const res = await chai.request(app).get(`/products/${testProduct._id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('productName').that.is.equal(testProduct.productName);
        });
    });

    describe('PUT /products/:productId', () => {
        it('should update product by ID', async () => {
            const updatedProductName = 'Updated Product';
            const res = await chai.request(app).put(`/products/${testProduct._id}`).send({ productName: updatedProductName });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('productName').that.is.equal(updatedProductName);
        });
    });

    describe('DELETE /products/:productId', () => {
        it('should delete product by ID', async () => {
            const res = await chai.request(app).delete(`/products/${testProduct._id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id').that.is.equal(testProduct._id.toString());
        });
    });
});
