module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    // staus code 403 means Forbidden
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  // if user is exist, let's let this user continue on to the actual request handler
  next();
};