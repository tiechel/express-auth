const express = require('express');
const router = express.Router();
const config = require('../../config');
const models = require('../../models');

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

router.get('/register', (req, res, next) => {
  res.render('account/register');
});

router.post('/register', (req, res, next) => {
  (async () => {
    const username = req.body.username;
    const password = req.body.password;
    const display_name = req.body.display_name;
    if ([username, password, display_name].some((v) => v.length == 0)) {
      req.flash('messages', ['未入力の項目があります。']);
      return res.redirect('/account/register');
    }
    const user = models.User.build({ username: username, display_name: display_name });
    user.setPassword(password);
    await user.save();
    res.redirect(config.LOGIN_URL);
  })();
});

module.exports = router;
