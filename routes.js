const express = require("express");
const route = express.Router();
const homeController = require("./projetos/projetoagenda/src/controllers/homeController");
const loginController = require("./projetos/projetoagenda/src/controllers/loginController");
const contatoController = require("./projetos/projetoagenda/src/controllers/contatoController");

const { loginRequired } = require("./global/html/middlewares/middleware");

const path = require("path");

// Rotas da agenda get
route.get("/agenda", homeController.index);
route.get("/agenda/login", loginController.index);
route.get("/agenda/login/logout", loginController.logout);
route.get("/agenda/contato", loginRequired, contatoController.index);
route.get("/agenda/contato/:id", loginRequired, contatoController.editIndex);
route.get(
  "/agenda/contato/delete/:id",
  loginRequired,
  contatoController.delete
);

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

// Rota para api rest
route.get("/api_rest", (req, res) => {
  res.sendFile(path.join(__dirname, "../api_rest/html/index.html"));
});

module.exports = route;
