/* eslint-disable no-undef */
const db = require("../models");
exports.getFormaContactoList = async (req, res) => {
    const formaContactos = await db.formasContacto.findAll({
        include: [
            'persona',
        ],
    });
    res.send(formaContactos);
};
exports.getFormaContactoById = async (req, res) => {
    const { id } = req.params;
    const formaContacto = await db.formasContacto.findByPk(id, {
        include: [
            'persona',
        ],
    });
    if (!formaContacto) {
        return res.status(404).send({ message: 'FormaContacto no encontrada' });
    }
    res.send(formaContacto);
}
exports.postFormaContactoCreate = async (req, res) => {
    const { errors, formaContacto } = validateFormaContactoRequest(req);
    if (errors) {
        res.status(400).send(errors);
        return;
    }

    const formaContactoSaved = await db.formasContacto.create(formaContacto);
    if (!formaContactoSaved) {
        res.status(500).send({ message: "Error al crear la formaContacto" });
        return;
    }

    res.status(201).send(formaContactoSaved);
};

exports.patchFormaContactoUpdate = async (req, res) => {
    if (!req.body) {
        return { errors: { message: "Petición inválida" } };
    }
    const { id } = req.params;
    const formaContacto = await db.formasContacto.findByPk(id);
    if (!formaContacto) {
        return res.status(404).send({ message: 'FormaContacto no encontrada' });
    }
    const { tipo, valor, personaId, ciudad, fechaNacimiento } = req.body;
    if (tipo) {
        formaContacto.tipo = tipo;
    }
    if (valor) {
        formaContacto.valor = valor;
    }
    if (personaId) {
        formaContacto.personaId = personaId;
    }

    const formaContactoSaved = await formaContacto.save();
    if (!formaContactoSaved) {
        res.status(500).send({ message: "Error al editar la formaContacto" });
        return;
    }
    res.send(formaContactoSaved);
}

exports.putFormaContactoUpdate = async (req, res) => {
    const validationResponse = validateFormaContactoRequest(req);
    if (validationResponse.errors) {
        res.status(400).send(validationResponse.errors);
        return;
    }
    const { id } = req.params;
    const body = validationResponse.formaContacto;

    const formaContacto = await db.formasContacto.findByPk(id);
    if (!formaContacto) {
        return res.status(404).send({ message: 'FormaContacto no encontrada' });
    }
    formaContacto.tipo = body.tipo;
    formaContacto.valor = body.valor;
    formaContacto.personaId = body.personaId;
    const formaContactoSaved = await formaContacto.save();
    if (!formaContactoSaved) {
        res.status(500).send({ message: "Error al editar la formaContacto" });
        return;
    }

    res.send(formaContactoSaved);
};
exports.deleteFormaContacto = async (req, res) => {
    const { id } = req.params;
    const formaContacto = await db.formasContacto.findByPk(id);
    if (!formaContacto) {
        return res.status(404).send({ message: 'FormaContacto no encontrada' });
    }
    await formaContacto.destroy();
    res.status(204).send('');
}

const validateFormaContactoRequest = (req) => {
    if (!req.body) {
        return { errors: { message: "Petición inválida" } };
    }
    const { tipo, valor, personaId, ciudad, fechaNacimiento } = req.body;
    const errors = {};

    if (!tipo) errors.tipo = "El tipo es requerido";
    if (!valor) errors.valor = "El valor es requerido";
    if (!personaId) errors.personaId = "La personaId es requerida";
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    return {
        errors: null, formaContacto: {
            tipo,
            valor,
            personaId
        }
    };
}
