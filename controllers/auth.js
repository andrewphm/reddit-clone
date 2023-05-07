const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
  res.render('auth/signup');
};

const showLogin = (req, res) => {
  res.render('auth/login');
};

const createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      hashedPassword,
    });

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error('Something went wrong');
      error.statusCode = 500;
      throw error;
    }

    return res.redirect('/');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select('+hashedPassword');

    if (!user) {
      const error = new Error('No user found.');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.hashedPassword);

    if (!isPasswordCorrect) {
      const error = new Error('Password is incorrect.');
      error.statusCode = 401;
      throw error;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '60 days' }
    );

    // Set cookie and redirect to root
    res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true });
    return res.redirect('/');
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('accessToken');
  return res.redirect('/');
};

module.exports = {
  signUp,
  createUser,
  login,
  logout,
  showLogin,
};
