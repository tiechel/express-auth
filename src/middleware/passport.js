const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../../models');

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, false);
      });
  });

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        process.nextTick(() => {
          models.User.findOne({ where: { username: username } })
            .then((user) => {
              if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'ユーザー名またはパスワードが間違っています。' });
              }
              return done(null, user);
            })
            .catch((err) => {
              done(err);
            });
        });
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  return passport;
};
