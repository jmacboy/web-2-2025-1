module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");
    router.get("/", controller.getPersonaList);
    router.get("/create", controller.getPersonaCreate);
    router.post("/create", controller.postPersonaCreate);
    router.get("/:id", controller.getPersonaUpdate);
    router.post("/:id", controller.postPersonaUpdate);
    router.post("/:id/delete", controller.deletePersona);
    router.get("/:id/contactos", controller.getContactosPersona);
    app.use('/personas', router);
};