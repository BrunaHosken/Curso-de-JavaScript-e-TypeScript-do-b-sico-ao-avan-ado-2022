const { Router } = require("express");
const tokenController = require("../controller/TokenController");
const router = new Router();

router.post("/", tokenController.store);

module.exports = router;
