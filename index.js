"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const { dbConnection, mongoose } = require("./src/configs/dbConnection");
const app = express();

/* ------------------------------------------------------- */

// continue from here...
//enVariables to process.env
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//asyncErrors to errorHandler:
require("express-async-errors");

//db connection:
dbConnection();

//body parse
app.use(express.json());

// cookie: httpOnly:true XSS Cross Site Scripting, secure:https
const session = require("cookie-session");

// Run with general settings:
app.use(session({ secret: process.env.SECRET_KEY, httpOnly: false })); //!httpOnly default:true secure:false

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    session: req.session,
  });
});

//departments
app.use("/department", require("./src/routes/department.router"));
//personnels
app.use("/personnel", require("./src/routes/personnel.router"));

//not found routes
app.all("*", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route not available",
  });
});

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()

if (process.env.NODE_ENV == "development") {
  return;
  require("./src/helpers/dataCreate")()
    .then((res) => console.log("Data synched"))
    .catch((err) => console.error("Data could not synched"));
}
