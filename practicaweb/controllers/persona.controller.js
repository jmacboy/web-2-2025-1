const { formatDate } = require("../utils/date.utils");

module.exports = (app, db) => {

    app.get("/personas", async (req, res) => {
        const personas = await db.persona.findAll();
        res.render("pages/personas/list.ejs", { personas });
    });
    app.get('/personas/create', (req, res) => {

        res.render('pages/personas/form.ejs', { persona: null, formattedDate: null });
    });
    app.post('/personas/create', async (req, res) => {
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        await db.persona.create({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        });
        res.redirect('/personas');
    });
    app.get('/personas/:id', async (req, res) => {
        const { id } = req.params;

        const persona = await db.persona.findByPk(id);
        if (!persona) return res.redirect('/personas');

        const formattedDate = formatDate(persona.fechaNacimiento);
        res.render('pages/personas/form.ejs', { persona, formattedDate });
    });
    app.post('/personas/:id', async (req, res) => {
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
    });
    app.post('/personas/:id/delete', async (req, res) => {
        const { id } = req.params;
        const persona = await db.persona.findByPk(id);
        if (!persona) return res.redirect('/personas');
        await persona.destroy();
        res.redirect('/personas');
    });

};