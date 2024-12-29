"use strict";

require("dotenv").config;
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0 ",
  language: "tr-TR",
});
