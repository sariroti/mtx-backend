function responseMiddleware(req, res, next) {
  const body = {
    status: 'OK',
    message: 'OK',
    payload: null,
  };

  res.locals.payload = body;

  next();
}

module.exports = {
  responseMiddleware,
};
