module.exports = (app, db) => {
    app.get('/personas/:id/contactos', async (req, res) => {
        const { id } = req.params;
        const contactos = await db.formasContacto.findAll({
            where: { personaId: id },
            include: 'persona'
        });
        res.render('pages/contactos/list.ejs', { contactos: contactos });
    });
    app.get('/contactos/create', async (req, res) => {
        const personas = await db.persona.findAll();
        res.render('pages/contactos/form.ejs', { contacto: null, personas });
    });
    app.post('/contactos/create', async (req, res) => {
        const { tipo, valor, personaId } = req.body;
        await db.formasContacto.create({
            tipo,
            valor,
            personaId
        });
        res.redirect(`/personas/${personaId}/contactos`);
    });
    app.get('/contactos/:id', async (req, res) => {
        const { id } = req.params;
        const contacto = await db.formasContacto.findByPk(id);
        if (!contacto) return res.redirect('/personas');
        const personas = await db.persona.findAll();
        res.render('pages/contactos/form.ejs', { contacto, personas });
    });
    app.post('/contactos/:id', async (req, res) => {
        const { id } = req.params;
        const { tipo, valor, personaId } = req.body;
        const contacto = await db.formasContacto.findByPk(id);
        if (!contacto) return res.redirect('/personas');
        contacto.tipo = tipo;
        contacto.valor = valor;
        contacto.personaId = personaId;
        await contacto.save();
        res.redirect(`/personas/${personaId}/contactos`);
    });

}