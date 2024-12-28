"user strict";

const router = require("express").Router();
const { login, logout } = require("../controllers/auth");

// {
//     "username":"test1"
//     "password":"1234"
// }

router.post("/login", login);
router.get("/logout", logout);

module.exports = router; //! authentication için middleware de bir auth.js aç.
