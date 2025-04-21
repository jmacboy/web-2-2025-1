/* eslint-disable no-undef */
const db = require("../models/");
exports.getPersonaList = async (req, res) => {
    const personas = await db.persona.findAll();
    res.send(personas);
};
exports.postPersonaCreate = async (req, res) => {
    const { errors, persona } = validatePersonaRequest(req);
    if (errors) {
        res.status(400).send(errors);
        return;
    }

    const personaSaved = await db.persona.create(persona);
    if (!personaSaved) {
        res.status(500).send({ message: "Error al crear la persona" });
        return;
    }

    res.send(personaSaved);
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
    res.send(persona);
};
exports.deletePersona = async (req, res) => {
    const { id } = req.params;
    const persona = await db.persona.findByPk(id);
    if (!persona) {
        return res.status(404).send({ message: 'Persona no encontrada' });
    }
    await persona.destroy();
    res.send({ message: 'Persona eliminada' });
}

const validatePersonaRequest = (req) => {
    if (!req.body) {
        return { errors: { message: "Petición inválida" } };
    }
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    const errors = {};

    if (!nombre) errors.nombre = "El nombre es requerido";
    if (!apellido) errors.apellido = "El apellido es requerido";
    if (!edad) errors.edad = "La edad es requerida";
    if (!ciudad) errors.ciudad = "La ciudad es requerida";
    if (!fechaNacimiento) errors.fechaNacimiento = "La fecha de nacimiento es requerida";
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    return {
        errors: null, persona: {
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        }
    };
}
