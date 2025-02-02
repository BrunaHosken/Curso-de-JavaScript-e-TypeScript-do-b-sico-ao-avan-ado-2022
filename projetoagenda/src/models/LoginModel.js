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
    this.errorsAgenda = [];
    this.userAgenda = null;
  }

  async login() {
    this.valida();
    if (this.errorsAgenda.length > 0) return;

    this.userAgenda = await LoginModelAgenda.findOne({
      email: this.body.email,
    });

    if (!this.userAgenda) {
      this.errorsAgenda.push("Usuário não existe");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.userAgenda.password)) {
      this.errorsAgenda.push("Senha inválida");
      this.userAgenda = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errorsAgenda.length > 0) return;

    await this.userExists();

    if (this.errorsAgenda.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.userAgenda = await LoginModelAgenda.create(this.body);
  }

  async userExists() {
    const user = await LoginModelAgenda.findOne({ email: this.body.email });
    if (user) this.errorsAgenda.push("Usuário já existe");
  }

  valida() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email))
      this.errorsAgenda.push("Email inválido");
    if (this.body.password.length < 3 || this.body.password.length > 50)
      this.errorsAgenda.push("A senha precisa ter entre 3 e 50 caracteres");
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
