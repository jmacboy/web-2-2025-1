module.exports = (app, db) => {
    require('./persona.controller')(app, db);
    require('./prueba.controller')(app, db);
};