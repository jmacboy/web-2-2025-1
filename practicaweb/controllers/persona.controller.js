const { formatDate } = require("../utils/date.utils");
const db = require("../models/");

exports.getPersonaList = async (req, res) => {
    const personas = await db.persona.findAll();
    res.render("pages/personas/list.ejs", { personas });
};
exports.getPersonaCreate = (req, res) => {
    res.render('pages/personas/form.ejs', { persona: null, formattedDate: null });
};
exports.postPersonaCreate = async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    await db.persona.create({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    res.redirect('/personas');
};
exports.getPersonaUpdate = async (req, res) => {
    const { id } = req.params;

    const persona = await db.persona.findByPk(id);
    if (!persona) return res.redirect('/personas');

    const formattedDate = formatDate(persona.fechaNacimiento);
    res.render('pages/personas/form.ejs', { persona, formattedDate });
};
exports.postPersonaUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    const persona = await db.persona.findByPk(id);
    if (!persona) return res.redirect('/personas');

    persona.nombre = nombre;
    persona.apellido = apellido;
    persona.edad = edad;
    persona.ciudad = ciudad;
    persona.fechaNacimiento = fechaNacimiento;
    await persona.save();
    res.redirect('/personas');
};
exports.deletePersona = async (req, res) => {
    const { id } = req.params;
    const persona = await db.persona.findByPk(id);
    if (!persona) return res.redirect('/personas');
    await persona.destroy();
    res.redirect('/personas');
}
exports.getContactosPersona = async (req, res) => {
    const { id } = req.params;
    const contactos = await db.formasContacto.findAll({
        where: { personaId: id },
        include: 'persona'
    });
    res.render('pages/contactos/list.ejs', { contactos: contactos });
}