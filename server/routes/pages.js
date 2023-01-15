const express = require("express");
const authController = require("./controllers/auth");
const router = express.Router();
router.get('/register', (req, res) => {
    res.sendFile("register.html", { root: './public/' })
});