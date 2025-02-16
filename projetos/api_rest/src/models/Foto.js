const { Sequelize, Model } = require("sequelize");

module.exports = class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ficar vazio",
            },
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" });
  }
};
