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
const app = express();

/* ------------------------------------------------------- */

// continue from here...
//enVariables to process.env
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//asyncErrors to errorHandler:
require("express-async-errors");

//db connection:
const dbConnetion = require("./src/configs/dbConnection");

//body parse
app.use(express.json())

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
