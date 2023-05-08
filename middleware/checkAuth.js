const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  console.log('Checking authentication');

  if (!req.cookies.accessToken) {
    req.user = null;
  } else {
    const accessToken = req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET) || {};
    req.user = decoded;
  }

  console.log('User: ', req.user);

  next();
};

module.exports = checkAuth;
