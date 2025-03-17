const { sequelize, Sequelize } = require("../config/db.config");

require("./persona")(sequelize, Sequelize);

sequelize.sync();