/* eslint-disable no-undef */
const db = require("../models/");
exports.getPersonaList = async (req, res) => {
    const personas = await db.persona.findAll({
        include: [
            'formasContacto',
        ],
    });
    res.send(personas);
};
exports.getPersonaById = async (req, res) => {
    const { id } = req.params;
    const persona = await db.persona.findByPk(id, {
        include: [
            'formasContacto',
        ],
    });
    if (!persona) {
        return res.status(404).send({ message: 'Persona no encontrada' });
    }
    res.send(persona);
}
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

    res.status(201).send(personaSaved);
};

exports.patchPersonaUpdate = async (req, res) => {
    if (!req.body) {
        return { errors: { message: "Petición inválida" } };
    }
    const { id } = req.params;
    const persona = await db.persona.findByPk(id);
    if (!persona) {
        return res.status(404).send({ message: 'Persona no encontrada' });
    }
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    if (nombre) {
        persona.nombre = nombre;
    }
    if (apellido) {
        persona.apellido = apellido;
    }
    if (edad) {
        persona.edad = edad;
    }
    if (ciudad) {
        persona.ciudad = ciudad;
    }
    if (fechaNacimiento) {
        persona.fechaNacimiento = fechaNacimiento;
    }
    const personaSaved = await persona.save();
    if (!personaSaved) {
        res.status(500).send({ message: "Error al editar la persona" });
        return;
    }
    res.send(personaSaved);
}

exports.putPersonaUpdate = async (req, res) => {
    const validationResponse = validatePersonaRequest(req);
    if (validationResponse.errors) {
        res.status(400).send(validationResponse.errors);
        return;
    }
    const { id } = req.params;
    const body = validationResponse.persona;

    const persona = await db.persona.findByPk(id);
    if (!persona) {
        return res.status(404).send({ message: 'Persona no encontrada' });
    }
    persona.nombre = body.nombre;
    persona.apellido = body.apellido;
    persona.edad = body.edad;
    persona.ciudad = body.ciudad;
    persona.fechaNacimiento = body.fechaNacimiento;
    const personaSaved = await persona.save();
    if (!personaSaved) {
        res.status(500).send({ message: "Error al editar la persona" });
        return;
    }

    res.send(personaSaved);
};
exports.deletePersona = async (req, res) => {
    const { id } = req.params;
    const persona = await db.persona.findByPk(id);
    if (!persona) {
        return res.status(404).send({ message: 'Persona no encontrada' });
    }
    await persona.destroy();
    res.status(204).send('');
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
