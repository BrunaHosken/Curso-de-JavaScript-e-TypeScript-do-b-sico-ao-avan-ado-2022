const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const homeRoutes = require("../src/routes/homeRoutes");
const alunoRoutes = require("../src/routes/alunoRoutes");
const userRoutes = require("../src/routes/userRoutes");
const tokenRoutes = require("../src/routes/tokenRoutes");
const fotoRoutes = require("../src/routes/fotoRoutes");

require("../src/database");

const whiteList = ["http://35.247.229.37", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
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
