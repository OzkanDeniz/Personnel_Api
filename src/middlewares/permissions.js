"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      console.log(req.user)
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("Nopermission : You must Login.");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("Nopermission : You must Login and to be Admin.");
    }
  },
  isAdminorLead: (req, res, next) => {
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin ||
        (req.user.isLead && req.user.departmentId === req.params.departmentId))
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("Nopermission : You must be login Admin or DepartmentLead.");
    }
  },
};
