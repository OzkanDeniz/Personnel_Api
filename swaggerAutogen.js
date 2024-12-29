"use strict";

require("dotenv").config;
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const swaggerAutogen = require("swagger-autogen")({});

const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,
    // termOfService: "http://127.0.0.1#",
    contact: { name: packageJson.author },
    license: { name: packageJson.license },
  },
  host: HOST + ":" + PORT,
  basePath: "/",
  schemes: ["http,https"],
  securityDefinitions: {
    //Simple Token:
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Simple Token * Example: <b>Token ...tokenKey...</b> ",
    },
  },
  security: [{ Token: [] }],
};

const routes = ["./index"];
const outputFile = "./swagger.json";

//RUN:
swaggerAutogen(outputFile, routes, document);
