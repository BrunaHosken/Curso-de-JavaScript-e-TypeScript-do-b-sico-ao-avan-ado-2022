const { Router } = require("express");
const userController = require("../controller/UserController");
const loginRequired = require("../middlewares/loginRequired");
const router = new Router();

router.get("/", userController.index);
router.get("/:id", userController.show);

router.post("/", userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

module.exports = router;
