const validator = require("../../../global/node_modules/validator");
const mongoose = require("../../../global/node_modules/mongoose");
const bcryptjs = require("../../../global/node_modules/bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModelAgenda = mongoose.model("LoginAgenda", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModelAgenda.create(this.body);
  }

  async userExists() {
    const user = await LoginModelAgenda.findOne({ email: this.body.email });
    if (user) this.errors.push("Usuário já existe");
  }

  valida() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email)) this.errors.push("Email inválido");
    if (this.body.password.length < 3 || this.body.password.length > 50)
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
