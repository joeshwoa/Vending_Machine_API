const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Reset API', () => {
    describe('POST /reset', () => {
        it('should reset the user deposit to 0', async () => {
            const user = new User({ username: 'testuser', password: 'password', deposit: 100, role: 'buyer' });
            await user.save();

            const res = await chai.request(app).post('/reset').set('Authorization', `Bearer ${user.generateAuthToken()}`);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('deposit').that.is.equal(0);
        });
    });

    // Add more tests as needed
});
