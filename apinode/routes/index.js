module.exports = app => {
    require('./persona.routes')(app);
    require('./formaContacto.routes')(app);
}