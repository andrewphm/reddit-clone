const router = require('express').Router();

const { signUp, createUser, login, logout, showLogin } = require('../controllers/auth');

router.get('/login', showLogin);
router.get('/sign-up', signUp);
router.post('/sign-up', createUser);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
