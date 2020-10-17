const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    // GoogleStrategy has an internal identifier of google (string 'google')
    passport.authenticate('google', {
      // option object to access and read user's info (user's contacts, email, profile...)
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
