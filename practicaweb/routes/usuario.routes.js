const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/usuario.controller.js");

    router.get("/", requireUser, controller.getUsuarioList);
    router.get("/create", controller.getUsuarioCreate);
    router.post("/create", controller.postUsuarioCreate);
    router.get("/:id", requireUser, controller.getUsuarioUpdate);
    router.post("/:id", requireUser, controller.postUsuarioUpdate);
    router.post("/:id/delete", requireUser, controller.deleteUsuario);
    app.use('/usuarios', router);
};