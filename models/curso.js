module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define("Curso", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Curso.associate = (models) => {
        Curso.belongsTo(models.Aluno, {
            foreignKey: "alunoId",
            as: "Aluno",
        });
    };
    return Curso;

};