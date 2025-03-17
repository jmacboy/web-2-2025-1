const e = require("express");
const { DataTypes } = require("sequelize");

module.exports = function (sequelize, Sequelize) {
    const Persona = sequelize.define(
        'Persona',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            apellido: {
                type: DataTypes.STRING,
            },
            edad: {
                type: DataTypes.INTEGER,
            },
            ciudad: {
                type: DataTypes.STRING,
            },
            fechaNacimiento: {
                type: DataTypes.DATE,
            }
        },
    );
    return Persona;
}