const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const postRoutes = require('./routes/post');
const subredditRoutes = require('./routes/subreddit');
const authRoutes = require('./routes/auth');

const exphbs = require('express-handlebars');
app.use(express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Connect to MongoDB
require('./data/reddit-db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postRoutes);
app.use('/', subredditRoutes);
app.use('/', authRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(5000, () => console.log(`Sever started on http://localhost:5000`));

module.exports = app;
