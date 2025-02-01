const { type } = require("os");
const mongoose = require("../../../global/node_modules/mongoose");
const validator = require("../../../global/node_modules/validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errorsAgenda = [];
  this.contato = null;
}

Contato.buscaPorId = async function (id) {
  const user = await ContatoModel.findById(id);
  return user;
};

Contato.prototype.edit = async function (id) {
  if (typeof id !== "string") return;

  this.valida();

  if (this.errorsAgenda.length > 0) return;

  this.contato = await ContatoModel.useFindAndModify(id, this.body, {
    new: true,
  });
};

Contato.prototype.register = async function () {
  this.valida();

  if (this.errorsAgenda.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function () {
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email))
    this.errorsAgenda.push("Email inválido");
  if (!this.body.nome) this.errorsAgenda.push("Nome é um campo obrigatório");
  if (!this.body.email && !this.body.telefone)
    this.errorsAgenda.push(
      "Pelo menos um contato precisa ser enviado: e-mail ou telefone"
    );
};
Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};

module.exports = Contato;
