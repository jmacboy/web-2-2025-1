const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const FormasContacto = sequelize.define(
        'FormasContacto',
        {
            tipo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            valor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            personaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
    );
    return FormasContacto;
}