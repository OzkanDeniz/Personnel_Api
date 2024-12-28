"use strict";

const router = require("express").Router();

//auth
router.use("/auth/", require("../routes/auth"));
//tokens
router.use("/tokens/", require("../routes/token"));
//personnel
router.use("/personnel/", require("../routes/personnel.router"));
//department
router.use("/department/", require("../routes/department.router"));

module.exports = router