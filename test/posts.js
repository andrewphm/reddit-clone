const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { describe, it, beforeEach } = require('mocha');
const app = require('../index');
const Post = require('../models/Post');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;
// Agent that will keep track of our cookies
const agent = chai.request.agent(app);

describe('Posts', () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  before(async () => {
    await User.deleteMany({});

    await agent
      .post('/sign-up')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username: 'testone', password: 'password' });

    await agent
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username: 'testone', password: 'password' });
  });

  after(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    agent.close();
  });

  describe('POST /posts/new', () => {
    it('should create a new post with valid attributes', async () => {
      const initialDocCount = await Post.estimatedDocumentCount();
      expect(initialDocCount).to.equal(0);

      const user = await User.findOne({ username: 'testone' });

      const res = await chai.request(app).post('/posts/new').send({
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary',
        subreddit: 'test',
        author: user._id,
      });

      const newDocCount = await Post.estimatedDocumentCount();

      agent.should.have.cookie('accessToken');
      expect(res.status).to.equal(200);

      expect(newDocCount).to.equal(initialDocCount + 1);
    });

    it('should return an error if required fields are missing', async () => {
      const initialDocCount = await Post.estimatedDocumentCount();
      expect(initialDocCount).to.equal(0);

      const res = await chai.request(app).post('/posts/new').send({
        title: 'post title',
        url: 'https://www.google.com',
        // summary field is missing
        subreddit: 'test',
      });

      const newDocCount = await Post.estimatedDocumentCount();

      expect(res.status).to.equal(401);
      expect(newDocCount).to.equal(initialDocCount);
      expect(res.body).to.have.property('error');
    });
  });
});
