const { sequelize } = require("../config/db.config");

const persona = require("./persona")(sequelize);
const formasContacto = require("./formasContacto")(sequelize);
const usuario = require("./usuario")(sequelize);
persona.hasMany(formasContacto, {
    foreignKey: "personaId",
    sourceKey: "id",
    as: "formasContacto"
});
formasContacto.belongsTo(persona, {
    foreignKey: "personaId",
    as: "persona"
});

module.exports = {
    persona,
    formasContacto,
    usuario,
    sequelize,
    Sequelize: sequelize.Sequelize
};
