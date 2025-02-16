class HomeController {
  async index(req, res) {
    res.json("Bem vindo a api rest com CRUD da escola!");
  }
}

module.exports = new HomeController();
