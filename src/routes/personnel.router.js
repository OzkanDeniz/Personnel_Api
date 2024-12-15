"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const personnel = require("../controllers/personnel.controller");

/* ------------------------------------------------------- */
//URL: /personnel
//http://localhost:8000/personnel/login
//!login logout
router.post("/login", personnel.login);
router.all("/logout", personnel.logout);

router.route("/").get(personnel.list).post(personnel.create);

router
  .route("/:id")
  .get(personnel.read)
  .put(personnel.update)
  .patch(personnel.update)
  .delete(personnel.delete);

module.exports = router;
