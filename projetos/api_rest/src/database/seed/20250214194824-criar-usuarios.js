const bcryptjs = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    return await queryInterface.bulkInsert(
      "users",
      [
        {
          nome: "John Doe",
          email: "johndoe@example.com",
          password_hash: await bcryptjs.hash("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Jane Doe",
          email: "janedoe@example.com",
          password_hash: await bcryptjs.hash("abcdef", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Alice Johnson",
          email: "alice@example.com",
          password_hash: await bcryptjs.hash("qwerty", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {},
};
