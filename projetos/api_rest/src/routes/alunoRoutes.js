const { Router } = require("express");
const alunoController = require("../controller/AlunoController");
const loginRequired = require("../middlewares/loginRequired");
const router = new Router();

router.get("/", alunoController.index);
router.get("/:id", alunoController.show);

router.post("/", loginRequired, alunoController.store);
router.put("/:id", loginRequired, alunoController.update);
router.delete("/:id", loginRequired, alunoController.delete);

module.exports = router;
