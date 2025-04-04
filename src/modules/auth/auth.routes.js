const { Router } = require("express");
const { Register, Login } = require("./auth.service");
const router = Router();

router.post('/register', Register);

router.post('/login', Login);

module.exports = {
    authRoutes: router
}