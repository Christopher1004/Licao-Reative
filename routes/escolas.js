const express = require('express');
const router = express.Router();
const { Escola } = require('../models');

// Listar escola
router.get("/", async (req, res) => {
    const escolas = await Escola.findAll();
    res.render(
        "base", {
            title: "Listar Escolas",
            view: "escolas/show",
            escolas,
    });
});

// Adicionar nova escola - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Escola",
            view: "escolas/add",
    });
});

// Adicionar nova escola - no BD
router.post("/add", async(req, res) =>{
    await Escola.create({ nome: req.body.nome });
    res.redirect("/escolas");
});

// Editar escola - formulário
router.get("/edit/:id", async (req, res) => {
    const escola = await Escola.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Escola",
            view: "escolas/edit",
            escola,
    });
});

// Editar escola - no BD
router.post("/edit/:id", async(req, res) =>{
    await Escola.update(
        { nome: req.body.nome },
        { where: { id: req.params.id } }
    );
    res.redirect("/escolas");
});

// Excluir escola
router.post("/delete/:id", async(req, res) =>{
    await Escola.destroy({ where: { id: req.params.id } });
    res.redirect("/escolas");
});

module.exports = router;
