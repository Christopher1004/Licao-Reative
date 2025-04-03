module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define("Aluno", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Aluno;

}; 