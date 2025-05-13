const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");

    router.get("/", requireUser, controller.getPersonaList);
    router.get("/:id", requireUser, controller.getPersonaById);
    router.post("/", requireUser, controller.postPersonaCreate);
    router.put("/:id", requireUser, controller.putPersonaUpdate);
    router.patch("/:id", requireUser, controller.patchPersonaUpdate);
    router.delete("/:id", requireUser, controller.deletePersona);
    app.use('/personas', router);
};