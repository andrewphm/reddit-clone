// test/auth.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../index');

const should = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(app);

const User = require('../models/User');

describe('User', function () {
  before(async () => {
    await User.deleteMany({});
  });

  // TESTS WILL GO HERE.
  it('should not be able to login if they have not registered', async function () {
    const res = await agent.post('/login').send({ username: '', password: '' });
    res.should.have.status(401);
  });

  it('should be able to signup', async function () {
    const res = await agent.post('/sign-up').send({ username: 'testone', password: 'password' });
    res.should.have.status(200);
    // agent.should.have.cookie('nToken');
  });

  it('should be able to login', async function () {
    const res = await agent.post('/login').send({ username: 'testone', password: 'password' });
    res.should.have.status(200);
    agent.should.have.cookie('accessToken');
  });

  it('should be able to logout', async function () {
    const res = await agent.get('/logout');
    res.should.have.status(200);
    agent.should.not.have.cookie('accessToken');
  });

  after(function () {
    agent.close();
  });
});
