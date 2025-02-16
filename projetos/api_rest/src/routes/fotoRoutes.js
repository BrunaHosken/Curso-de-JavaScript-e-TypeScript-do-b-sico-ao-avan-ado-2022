const { Router } = require("express");

const fotoController = require("../controller/FotoController");
const loginRequired = require("../middlewares/loginRequired");

const router = new Router();

router.post("/", loginRequired, fotoController.store);

module.exports = router;
