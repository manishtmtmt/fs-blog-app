const { Router } = require("express");

const { registerUser, login } = require("../../controllers/auth");

const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", login);

module.exports = authRouter;
