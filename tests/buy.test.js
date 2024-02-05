const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Buy API', () => {
    describe('POST /buy', () => {
        it('should buy products with the money deposited by the user', async () => {
            const user = new User({ username: 'testuser', password: 'password', deposit: 100, role: 'buyer' });
            await user.save();

            const product = new Product({ productName: 'Test Product', amountAvailable: 10, cost: 50, sellerId: user._id });
            await product.save();

            const purchaseAmount = 2;
            const res = await chai.request(app)
                .post('/buy')
                .send({ productId: product._id, amount: purchaseAmount })
                .set('Authorization', `Bearer ${user.generateAuthToken()}`);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('totalSpent').that.is.equal(100);
            expect(res.body).to.have.property('purchasedProducts').that.is.an('object').with.property('quantity').that.is.equal(purchaseAmount);
            expect(res.body).to.have.property('change').that.is.equal(50);
        });
    });

    // Add more tests as needed
});
