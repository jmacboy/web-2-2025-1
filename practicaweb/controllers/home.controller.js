/* eslint-disable no-undef */

exports.index = (req, res) => {
    const title = "Hola Mundo";
    res.render("pages/index.ejs", { title, usuario: null });
};
exports.prueba = (req, res) => {
    const persona = db.persona.create({
        nombre: "Juan",
        apellido: "Perez",
        edad: 25,
        ciudad: "Bogota",
        fechaNacimiento: new Date("1996-05-12"),
    });
    res.render("pages/prueba.ejs", { persona });
}
exports.form = (req, res) => {
    res.sendFile(__dirname + "/form.html");
}
exports.receiveInfoGet = (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    res.send(`First name: ${firstName}, Last name: ${lastName}`);
};
exports.receiveInfoPost = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    res.send(`First name: ${firstName}, Last name: ${lastName}`);
}