module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/prueba.controller.js");
    router.get("/", controller.index);
    router.get("/prueba", controller.prueba);
    router.get("/form", controller.form);
    router.get("/receiveinfoget", controller.receiveInfoGet);
    router.post("/receiveinfopost", controller.receiveInfoPost);
    app.use('', router);
};