module.exports = (sequelize, DataTypes) => {

    const Produto = sequelize.define("Produto", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });


    Produto.associate = (models) => {
        Produto.belongsTo(models.Categoria, {
            foreignKey: "categoriaId",
            as: "Categoria", 
        });
    };
    return Produto;

};