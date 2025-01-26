exports.middlewareGlobal = (req, res, next) => {
  res.locals.errorsAgenda = req.flash("errorsAgenda");
  res.locals.successAgenda = req.flash("successAgenda");
  res.locals.userAgenda = req.session.userAgenda;
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
