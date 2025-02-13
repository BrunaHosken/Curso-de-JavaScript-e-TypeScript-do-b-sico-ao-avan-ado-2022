const Sequelize = require("sequelize");
const databaseConfig = require("../config/database");
const Aluno = require("../models/Aluno");

const models = [Aluno];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
