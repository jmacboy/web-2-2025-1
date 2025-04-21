const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");

    router.get("/", requireUser, controller.getPersonaList);
    router.get("/create", requireUser, controller.getPersonaCreate);
    router.post("/create", requireUser, controller.postPersonaCreate);
    router.get("/search", controller.getPersonaSearch);
    router.get("/:id", requireUser, controller.getPersonaUpdate);
    router.post("/:id", requireUser, controller.postPersonaUpdate);
    router.post("/:id/delete", requireUser, controller.deletePersona);
    router.get("/:id/contactos", requireUser, controller.getContactosPersona);
    router.get("/:id/perfil", requireUser, controller.getFormPerfil);
    router.post("/:id/perfil", requireUser, controller.postFormPerfil);
    app.use('/personas', router);
};