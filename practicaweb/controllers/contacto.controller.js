const db = require("../models/");

exports.getContactoCreate = async (req, res) => {
    const personas = await db.persona.findAll();
    res.render('pages/contactos/form.ejs', { contacto: null, personas });
};
exports.postContactoCreate = async (req, res) => {
    const { tipo, valor, personaId } = req.body;
    await db.formasContacto.create({
        tipo,
        valor,
        personaId
    });
    res.redirect(`/personas/${personaId}/contactos`);
};
exports.getContactoUpdate = async (req, res) => {
    const { id } = req.params;
    const contacto = await db.formasContacto.findByPk(id);
    if (!contacto) return res.redirect('/personas');
    const personas = await db.persona.findAll();
    res.render('pages/contactos/form.ejs', { contacto, personas });
};
exports.postContactoUpdate = async (req, res) => {
    const { id } = req.params;
    const { tipo, valor, personaId } = req.body;
    const contacto = await db.formasContacto.findByPk(id);
    if (!contacto) return res.redirect('/personas');
    contacto.tipo = tipo;
    contacto.valor = valor;
    contacto.personaId = personaId;
    await contacto.save();
    res.redirect(`/personas/${personaId}/contactos`);
};