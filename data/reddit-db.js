const mongoose = require('mongoose');

// Replace `test-db` with the name of your database
const mongoURI = 'mongodb://localhost/reddit-db';

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
