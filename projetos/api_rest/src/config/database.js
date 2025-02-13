require("dotenv").config();

module.exports = {
  dialect: "mariadb",
  host: process.env.DATABASE_REST_HOST,
  port: process.env.DATABASE_REST_PORT,
  username: process.env.DATABASE_REST_USERNAME,
  password: process.env.DATABASE_REST_PASSWORD,
  database: process.env.DATABASE_REST,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    timezone: "America/Sao_Paulo",
  },
  timezone: "America/Sao_Paulo",
};
