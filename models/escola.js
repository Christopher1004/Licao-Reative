const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = (sequelize, DataTypes) => {
    const Escola = sequelize.define("Escola", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Escola.associate = (models) => {
        Escola.hasMany(models.Professor, {
            foreignKey: "escolaId",
            as: "professores",
        });
    };

    return Escola;
};
