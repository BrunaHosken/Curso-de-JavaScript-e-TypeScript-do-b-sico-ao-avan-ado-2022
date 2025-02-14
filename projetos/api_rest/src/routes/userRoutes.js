const { Router } = require("express");
const userController = require("../controller/UserController");
const router = new Router();

router.post("/", userController.store);
router.get("/", userController.index);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
