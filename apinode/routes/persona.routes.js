
module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");

    router.get("/", controller.getPersonaList);
    router.post("/", controller.postPersonaCreate);
    app.use('/personas', router);
};