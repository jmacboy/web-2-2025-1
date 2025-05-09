const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const AuthToken = sequelize.define(
        'AuthToken',
        {
            usuarioId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
    );
    return AuthToken;
}