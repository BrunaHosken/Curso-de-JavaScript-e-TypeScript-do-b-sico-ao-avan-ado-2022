const { Router } = require("express");
const homeController = require("../controller/HomeController");
const router = new Router();

router.get("/home", homeController.index);

module.exports = router;
