module.exports = (req, res, next) => {
  if (!req.user) {
    // staus code 401 means Unauthorized
    return res.status(401).send({ error: 'You must log in!' });
  }

  // if user is exist, let's let this user continue on to the actual request handler
  next();
};