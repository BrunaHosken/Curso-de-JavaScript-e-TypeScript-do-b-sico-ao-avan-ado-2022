const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const Foto = require("../models/Foto");

const upload = multer(multerConfig).single("foto");

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errors: [err.code] });
      }
      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = await Foto.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (error) {
        return res.status(400).json({ errors: "Aluno não existe" });
      }
    });
  }
}

module.exports = new FotoController();
