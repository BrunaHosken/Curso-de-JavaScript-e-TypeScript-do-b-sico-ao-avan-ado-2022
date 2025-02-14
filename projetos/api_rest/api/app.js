const express = require("express");
const homeRoutes = require("../src/routes/homeRoutes");
const userRoutes = require("../src/routes/userRoutes");

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
    console.log("aqui");
    this.app.use("/api_rest/", homeRoutes);
    this.app.use("/api_rest/users/", userRoutes);
  }
}

module.exports = new App().app;
