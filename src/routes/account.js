const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/login', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/login', { title: 'ログイン' });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect(config.LOGIN_URL);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect(config.LOGIN_URL);
});

module.exports = router;
