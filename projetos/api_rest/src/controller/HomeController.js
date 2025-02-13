const Aluno = require("../models/Aluno");

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: "Bruna",
      sobrenome: "Hosken",
      email: "bruna16.hosken@gmail.com",
      idade: 27,
      peso: 42,
      altura: 1.46,
    });

    res.json(novoAluno);
  }
}

module.exports = new HomeController();
