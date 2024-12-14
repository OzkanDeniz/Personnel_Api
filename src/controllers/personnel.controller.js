"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// ../controllers/personnel.controller.js
module.exports = {
  list: async (req, res) => {
    res.send("List of personnel");
  },

  create: (req, res) => {
    res.send("Create a new personnel");
  },

  read: (req, res) => {
    res.send(`Get personnel with ID: ${req.params.id}`);
  },

  update: (req, res) => {
    res.send(`Update personnel with ID: ${req.params.id}`);
  },

  delete: (req, res) => {
    res.send(`Delete personnel with ID: ${req.params.id}`);
  },
};
