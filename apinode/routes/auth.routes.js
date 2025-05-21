const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/auth.controller.js");

    router.post("/login", controller.login);
    router.post("/register", controller.register);
    router.get('/me', requireUser, controller.me);
    app.use('/auth', router);
};