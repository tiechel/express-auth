const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/login', function (req, res, next) {
  res.render('auth/login', { title: 'ログイン' });
});

router.post('/login', function (req, res, next) {
  res.redirect(config.LOGIN_REDIRECT_URL);
});

router.get('/logout', function (req, res, next) {
  res.redirect(config.LOGIN_URL);
});

router.post('/logout', function (req, res, next) {
  res.redirect(config.LOGIN_URL);
});

module.exports = router;
