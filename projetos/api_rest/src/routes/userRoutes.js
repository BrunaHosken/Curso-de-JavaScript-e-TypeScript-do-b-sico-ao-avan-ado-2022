const { Router } = require("express");
const userController = require("../controller/UserController");
const router = new Router();

router.post("/", userController.store);

module.exports = router;
