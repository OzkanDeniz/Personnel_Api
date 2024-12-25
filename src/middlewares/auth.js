"use strict";

const Token = require("../models/token");

module.exports = async (req, res, next) => {
  // Authorization : Token ...
  // Authorization : ApiKey ...
  // Authorization : Bearer ...
  //! bu middleware "Token ..." formatında gelen headerları kontrol eder.

  const auth = req.headers?.authorization || null; //Token ...tokenkey...
  const tokenKey = auth ? auth.split(" ") : null; //['Token', ...TokenKey...]

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    ); //bu tokena ait kılanıcının userId sinide göster tokenData nın içerisinde.
    console.log(tokenData);
    if (tokenData) req.user = tokenData.userId; //zaten tokenData varsa eşle

    console.log(req.user);
  }
  next();
};
