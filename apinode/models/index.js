const { sequelize } = require("../config/db.config");

const persona = require("./persona")(sequelize);
const formasContacto = require("./formasContacto")(sequelize);
const usuario = require("./usuario")(sequelize);
const authToken = require("./authToken")(sequelize);
persona.hasMany(formasContacto, {
    foreignKey: "personaId",
    sourceKey: "id",
    as: "formasContacto"
});
formasContacto.belongsTo(persona, {
    foreignKey: "personaId",
    as: "persona"
});
usuario.hasMany(authToken, {
    foreignKey: "usuarioId",
    sourceKey: "id",
    as: "usuario"
});

module.exports = {
    persona,
    formasContacto,
    usuario,
    authToken,
    sequelize,
    Sequelize: sequelize.Sequelize
};
