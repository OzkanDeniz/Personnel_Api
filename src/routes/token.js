"user strict";
const { isAdmin } = require("../middlewares/permissions");
const router = require("express").Router();
// const {list,read,update,create,delete: deleteToken,} = require("../controllers/token");
const token = require("../controllers/token");

router.use(isAdmin);

router.route("/").get(token.list).post(token.create);

router
  .route("/:id")
  .get(token.read)
  .put(token.update)
  .patch(token.update)
  .delete(token.delete);

module.exports = router; //! authentication için middleware de bir auth.js aç.
