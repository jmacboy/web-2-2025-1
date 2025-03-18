const { sequelize } = require("../config/db.config");

const persona = require("./persona")(sequelize);

sequelize.sync();
module.exports = {
    persona,
};
