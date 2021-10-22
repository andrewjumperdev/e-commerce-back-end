const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/createAccount", userController.signUp);
router.post("/login", userController.login);
router.delete("/delete", auth, userController.destroyAccount);

module.exports = router;
