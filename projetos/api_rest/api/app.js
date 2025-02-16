const express = require("express");
const homeRoutes = require("../src/routes/homeRoutes");
const alunoRoutes = require("../src/routes/alunoRoutes");
const userRoutes = require("../src/routes/userRoutes");
const tokenRoutes = require("../src/routes/tokenRoutes");
const fotoRoutes = require("../src/routes/fotoRoutes");

require("../src/database");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api_rest/", homeRoutes);
    this.app.use("/api_rest/alunos/", alunoRoutes);
    this.app.use("/api_rest/users/", userRoutes);
    this.app.use("/api_rest/tokens/", tokenRoutes);
    this.app.use("/api_rest/fotos/", fotoRoutes);
  }
}

module.exports = new App().app;
