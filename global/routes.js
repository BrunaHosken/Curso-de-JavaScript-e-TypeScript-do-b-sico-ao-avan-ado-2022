const express = require("express");
const route = express.Router();
const homeController = require("../projetoagenda/src/controllers/homeController");
const loginController = require("../projetoagenda/src/controllers/loginController");
const path = require("path");

// Rotas da agenda
route.get("/agenda", homeController.index);
route.get("/agenda/login/index", loginController.index);
route.post("/agenda/login/register", loginController.register);

// Rota para a página inicial global
route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../global/html/index.html"));
});

// Rota para a landing page
route.get("/landing_page", (req, res) => {
  res.sendFile(path.join(__dirname, "../landing_page/index.html"));
});

module.exports = route;
