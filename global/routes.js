const express = require("express");
const route = express.Router();
const homeController = require("../projetoagenda/src/controllers/homeController");
const loginController = require("../projetoagenda/src/controllers/loginController");
const contatoController = require("../projetoagenda/src/controllers/contatoController");

const { loginRequired } = require("./html/middlewares/middleware");

const path = require("path");

// Rotas da agenda get
route.get("/agenda", homeController.index);
route.get("/agenda/login", loginController.index);
route.get("/agenda/login/logout", loginController.logout);
route.get("/agenda/contato", loginRequired, contatoController.index);
route.get("/agenda/contato/:id", loginRequired, contatoController.editIndex);

// Rotas da agenda post
route.post("/agenda/login/register", loginController.register);
route.post("/agenda/login/login", loginController.login);
route.post(
  "/agenda/contato/register",
  loginRequired,
  contatoController.register
);
route.post("/agenda/contato/edit/:id", loginRequired, contatoController.edit);

// Rota para a página inicial global
route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../global/html/index.html"));
});

// Rota para a landing page
route.get("/landing_page", (req, res) => {
  res.sendFile(path.join(__dirname, "../landing_page/index.html"));
});

module.exports = route;
