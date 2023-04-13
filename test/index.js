// test/index.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../index');
chai.use(chaiHttp);
const agent = chai.request.agent(app);

const should = chai.should();

describe('site', () => {
  // Describe what you are testing
  it('Should have home page', async () => {
    // Describe what should happen
    // In this case we test that the home page loads

    const res = await agent.get('/');
    res.should.have.status(200);
  });
});
