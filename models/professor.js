module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define("Professore", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Professor.associate = (models) => {
        Professor.belongsTo(models.Escola, {
            foreignKey: "escolaId",
            as: "Escola", // Use o alias consistente com as consultas
        });
    };

    return Professor;
};
