module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define("Aluno", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
   Aluno.associate = (models) => {
    Aluno.hasMany(models.Curso, {
        foreignKey: "cursoId",
        as: "curso"
    })
   }

    return Aluno;

}; 