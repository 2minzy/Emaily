module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  // if user is exist, let's let this user continue on to the actual request handler
  next();
};