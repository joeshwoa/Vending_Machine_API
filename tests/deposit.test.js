const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Deposit API', () => {
    describe('POST /deposit', () => {
        it('should deposit coins into the user account', async () => {
            const user = new User({ username: 'testuser', password: 'password', deposit: 0, role: 'buyer' });
            await user.save();

            const depositAmount = 50;
            const res = await chai.request(app).post('/deposit').send({ amount: depositAmount }).set('Authorization', `Bearer ${user.generateAuthToken()}`);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('deposit').that.is.equal(depositAmount);
        });
    });

    // Add more tests as needed
});
