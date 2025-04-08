const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/home.controller.js");
    const usuarioController = require("../controllers/usuario.controller.js");
    router.get("/", controller.index);
    router.get("/prueba", controller.prueba);
    router.get("/form", controller.form);
    router.get("/receiveinfoget", controller.receiveInfoGet);
    router.post("/receiveinfopost", controller.receiveInfoPost);
    router.get("/login", usuarioController.getLogin);
    router.post("/login", usuarioController.postLogin);
    router.get("/logout", requireUser, usuarioController.getLogout);
    app.use('', router);
};