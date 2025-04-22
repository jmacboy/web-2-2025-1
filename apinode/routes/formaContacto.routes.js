
module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/formaContacto.controller.js");

    router.get("/", controller.getFormaContactoList);
    router.get("/:id", controller.getFormaContactoById);
    router.post("/", controller.postFormaContactoCreate);
    router.put("/:id", controller.putFormaContactoUpdate);
    router.patch("/:id", controller.patchFormaContactoUpdate);
    router.delete("/:id", controller.deleteFormaContacto);
    app.use('/formas-contacto', router);
};