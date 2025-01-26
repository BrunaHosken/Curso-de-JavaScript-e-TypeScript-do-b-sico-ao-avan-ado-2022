const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.userAgenda) return res.render("login-logado");
  return res.render("login");
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errorsAgenda.length > 0) {
      req.flash("errorsAgenda", login.errorsAgenda);
      req.session.save(() => {
        return res.redirect("/agenda/login/index");
      });
      return;
    }

    req.flash("successAgenda", "Seu usuário foi criado com sucesso");

    req.session.save(() => {
      return res.redirect("/agenda/login/index");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errorsAgenda.length > 0) {
      req.flash("errorsAgenda", login.errorsAgenda);
      req.session.save(() => {
        return res.redirect("/agenda/login/index");
      });
      return;
    }

    req.flash("successAgenda", "Você entrou no sistema");
    req.session.userAgenda = login.userAgenda;
    req.session.save(() => {
      return res.redirect("/agenda/login/index");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/agenda");
};
