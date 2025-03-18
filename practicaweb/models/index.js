const { sequelize } = require("../config/db.config");

require("./persona")(sequelize);

sequelize.sync();