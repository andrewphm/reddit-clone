const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { describe, it, beforeEach } = require('mocha');
const app = require('../index');
const Post = require('../models/Post');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Posts', () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  describe('POST /posts/new', () => {
    it('should create a new post with valid attributes', async () => {
      const initialDocCount = await Post.estimatedDocumentCount();
      expect(initialDocCount).to.equal(0);

      const res = await chai.request(app).post('/posts/new').send({
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary',
        subreddit: 'test',
      });

      const newDocCount = await Post.estimatedDocumentCount();

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

      expect(res.status).to.equal(400);
      expect(newDocCount).to.equal(initialDocCount);
      expect(res.body).to.have.property('error');
    });
  });
});
