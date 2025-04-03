module.exports = app => {
    require('./prueba.routes')(app);
    require('./persona.routes')(app);
    require('./contacto.routes')(app);
}