"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// ../controllers/personnel.controller.js
const Personnel = require("../models/personnel.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Personnel, "departmentId");
    res.status(200).send({
      error: false,
      //!detail
      detail: await res.getModelListDetails(Personnel),
      //!data
      data,
    });
  },

  create: async (req, res) => {
    //! sistemde bir admin olacaksa ve db de admin önceden tanımlanmışsa
    // const isFirstAccount = (await Personnel.countDocuments()) === 0;
    // req.body.isAdmin = isFirstAccount ? true : false;

    //! ya da direkt admin false // her zaman başkasının admin olmasını engellemiş oluyoruz
    req.body.isAdmin = false;

    //!isLead control:

    const isLead = req.body.isLead || false;

    //!department lerin tüm islead lerini false yapmış olduk.
    if (isLead) {
      await Personnel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false },
        { runValidators: true }
      );
    }
    //!bu kullanıcının verisi isLead olacak.
    const data = await Personnel.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Personnel.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    //!isLead Control:
    const isLead = req.body.isLead || false;

    if (isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );

      await Personnel.updateMany(
        { departmentId, isLead: true },
        { isLead: false },
        { runValidators: true }
      );
    }

    //! Does it perform update validation by default?
    const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(201).send({
      error: false,
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Personnel.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  //! LOGIN & LOGOUT

  login: async (req, res) => {
    const { username, password } = req.body;
    //!authentication:
    if (username && password) {
      const user = await Personnel.findOne({ username, password });
      if (user) {
        if (user.password !== passwordEncrypt(password)) {
          res.errorstatusCode = 401;
          throw new Error("Login parameters are not true.");
        }
        //Set Session:
        req.session = {
          id: user._id,
          password: user.password, //!Normalde password gönderilmez güvenlik açığı oluşur.
        };
        //Set Cookie
        if (req.body?.rememberMe) {
          (req.session.rememberMe = true),
            (req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3);
        }
        res.status(200).send({
          error: false,
          message: "Login is OK",
          user,
        });
      } else {
        res.errorstatusCode = 401;
        throw new Error("Wrong username and password");
      }
    } else {
      res.errorstatusCode = 401;
      throw new Error("Please enter a valid username and password.");
    }
  },

  logout: async (req,res) => {
    req.session = null;
    res.send({
      error: false,
      message: "Logout is completed",
    });
  },
};
