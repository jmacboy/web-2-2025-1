const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/contacto.controller.js");
    router.get("/create", requireUser, controller.getContactoCreate);
    router.post("/create", requireUser, controller.postContactoCreate);
    router.get("/:id", requireUser, controller.getContactoUpdate);
    router.post("/:id", requireUser, controller.postContactoUpdate);
    app.use('/contactos', router);
};