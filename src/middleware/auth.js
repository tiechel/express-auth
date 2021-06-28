module.exports = {
  loginRequied: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/account/login');
    }
    return next();
  },
  permissionRequired: (permissions) => {
    return (req, res, next) => {
      return next();
    };
  },
};
