const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
    let testUser;

    before(async () => {
        // Clear users collection before running tests
        await User.deleteMany({});
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const userData = { username: 'testuser', password: 'password', deposit: 0, role: 'buyer' };
            const res = await chai.request(app).post('/users').send(userData);
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('username').that.is.equal(userData.username);
            testUser = res.body; // Save created user for future tests
        });
    });

    describe('GET /users/:userId', () => {
        it('should return user by ID', async () => {
            const res = await chai.request(app).get(`/users/${testUser._id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('username').that.is.equal(testUser.username);
        });
    });

    describe('PUT /users/:userId', () => {
        it('should update user by ID', async () => {
            const updatedUsername = 'updatedusername';
            const res = await chai.request(app).put(`/users/${testUser._id}`).send({ username: updatedUsername });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('username').that.is.equal(updatedUsername);
        });
    });

    describe('DELETE /users/:userId', () => {
        it('should delete user by ID', async () => {
            const res = await chai.request(app).delete(`/users/${testUser._id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id').that.is.equal(testUser._id.toString());
        });
    });
});
