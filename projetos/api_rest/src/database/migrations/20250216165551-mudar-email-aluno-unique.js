module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.changeColumn("alunos", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down() {},
};
