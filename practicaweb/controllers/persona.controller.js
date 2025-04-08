/* eslint-disable no-undef */
const { formatDate } = require("../utils/date.utils");
const db = require("../models/");
exports.getPersonaList = async (req, res) => {
    const personas = await db.persona.findAll();
    res.render("pages/personas/list.ejs", { personas });
};
exports.getPersonaCreate = (req, res) => {
    res.render('pages/personas/form.ejs', { persona: null, formattedDate: null, errors: null });
};
exports.postPersonaCreate = async (req, res) => {
    const { errors, persona } = validatePersonaForm(req);
    if (errors) {

        res.render('pages/personas/form.ejs', { errors, persona, formattedDate: persona.fechaNacimiento });
        return;
    }

    await db.persona.create(persona);
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
exports.getFormPerfil = async (req, res) => {
    const { id } = req.params;
    const persona = await db.persona.findByPk(id);
    if (!persona) return res.redirect('/personas');
    res.render('pages/personas/perfil.ejs', { persona });
}
exports.postFormPerfil = async (req, res) => {

    const id = req.params.id;
    const persona = await db.persona.findByPk(id);
    if (!req.files?.foto) {
        res.render('personas/perfil.ejs', { errors: { message: 'Debe seleccionar una imagen' }, persona });
        return;
    }
    const image = req.files.foto;
    // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/profile/' + persona.id + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            res.render('personas/perfil.ejs', { errors: { message: 'Error al subir la imagen' }, persona });
            console.log(err);
            return;
        }
        res.redirect('/personas');
    });

};
const validatePersonaForm = (req) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    const errors = {};

    if (!nombre) errors.nombre = "El nombre es requerido";
    if (!apellido) errors.apellido = "El apellido es requerido";
    if (!edad) errors.edad = "La edad es requerida";
    if (!ciudad) errors.ciudad = "La ciudad es requerida";
    if (!fechaNacimiento) errors.fechaNacimiento = "La fecha de nacimiento es requerida";
    if (Object.keys(errors).length > 0) {
        errors.message = "Todos los campos son requeridos";
        return { errors, persona: req.body };
    }

    return { errors: null, persona: req.body };
}
