const express = require("express");
const homeRoutes = require("../src/routes/homeRoutes");

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
  }
}

module.exports = new App().app;
