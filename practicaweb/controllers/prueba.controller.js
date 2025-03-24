module.exports = (app, db) => {
    app.get("/", (req, res) => {
        const title = "Hola Mundo";
        res.render("pages/index.ejs", { title });
    });
    app.get("/prueba", (req, res) => {
        const persona = db.persona.create({
            nombre: "Juan",
            apellido: "Perez",
            edad: 25,
            ciudad: "Bogota",
            fechaNacimiento: new Date("1996-05-12"),
        });
        res.render("pages/prueba.ejs", {});
    });
    app.get("/form", (req, res) => {
        res.sendFile(__dirname + "/form.html");
    });
    app.get("/receiveinfoget", (req, res) => {
        const firstName = req.query.firstName;
        const lastName = req.query.lastName;
        res.send(`First name: ${firstName}, Last name: ${lastName}`);
    });
    app.post("/receiveinfopost", (req, res) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        res.send(`First name: ${firstName}, Last name: ${lastName}`);
    });
}      