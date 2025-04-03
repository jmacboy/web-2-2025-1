module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/contacto.controller.js");
    router.get("/create", controller.getContactoCreate);
    router.post("/create", controller.postContactoCreate);
    router.get("/:id", controller.getContactoUpdate);
    router.post("/:id", controller.postContactoUpdate);
    app.use('/contactos', router);
};