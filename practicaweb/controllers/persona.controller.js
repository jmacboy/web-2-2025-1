module.exports = (app, db) => {

    app.get("/personas", async (req, res) => {
        const personas = await db.persona.findAll();
        res.render("pages/personas/list.ejs", { personas });
    });
    app.get('/personas/create', (req, res) => {
        res.render('pages/personas/form.ejs');
    });
    app.post('/personas', async (req, res) => {
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

};