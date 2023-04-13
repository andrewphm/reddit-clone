const mongoose = require('mongoose');

// Replace `test-db` with the name of your database
const mongoURI =
  process.env.NODE_ENV === 'dev'
    ? 'mongodb://localhost/reddit-db'
    : 'mongodb://localhost/reddit-test-db';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.log(err);
  });
