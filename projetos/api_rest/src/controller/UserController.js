const User = require("../models/User");

class HomeController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      res.json(novoUser);
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

module.exports = new HomeController();
