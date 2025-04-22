
module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");

    router.get("/", controller.getPersonaList);
    router.get("/:id", controller.getPersonaById);
    router.post("/", controller.postPersonaCreate);
    router.put("/:id", controller.putPersonaUpdate);
    router.patch("/:id", controller.patchPersonaUpdate);
    router.delete("/:id", controller.deletePersona);
    app.use('/personas', router);
};