module.exports = app => {
    require('./persona.routes')(app);
    require('./formaContacto.routes')(app);
    require('./auth.routes')(app);
}