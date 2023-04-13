const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, beforeEach } = require('mocha');
chai.use(chaiHttp);
const app = require('../index');
const agent = chai.request.agent(app);

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');

const should = chai.should();

describe('Posts', () => {
  // Post that we'll use for testing purposes
  const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary',
  };

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it('should create with valid attributes at POST /posts/new', async () => {
    // Checks how many posts there are now
    const initialDocCount = await Post.estimatedDocumentCount();

    const res = await agent
      .post('/posts/new')
      // This line fakes a form post,
      // since we're not actually filling out a form
      .set('content-type', 'application/x-www-form-urlencoded')
      // Make a request to create another
      .send(newPost);

    const newDocCount = await Post.estimatedDocumentCount();

    // Check that the database has status 200
    res.should.have.status(200);
    // Check that the database has one more post in it
    newDocCount.should.equal(initialDocCount + 1);
  });
});
