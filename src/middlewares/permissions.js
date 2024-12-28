"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.use.isActive) {
      next();
    } else {
      res.errrorStatusCode = 403;
      throw new Error("Nopermission : You must Login.");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errrorStatusCode = 403;
      throw new Error("Nopermission : You must Login and to be Admin.");
    }
  },
  isAdminorLead: (req, res, next) => {
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin ||
        (req.user.isLead && req.user.departmentId === departmentId))
    ) {
      next();
    } else {
      res.errrorStatusCode = 403;
      throw new Error("Nopermission : You must be login Admin or DepartmentLead.");
    }
  },
};
