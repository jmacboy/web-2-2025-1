const { sequelize } = require("../config/db.config");

const persona = require("./persona")(sequelize);
const formasContacto = require("./formasContacto")(sequelize);

persona.hasMany(formasContacto, {
    foreignKey: "personaId",
    sourceKey: "id",
    as: "formasContacto"
});
formasContacto.belongsTo(persona, {
    foreignKey: "personaId",
    as: "persona"
});

sequelize.sync();
module.exports = {
    persona,
    formasContacto
};
