const express = require('express');
const router = express.Router();
const { Aluno } = require('../models');

// Listar alunos
router.get("/", async (req, res) => {
    const alunos = await Aluno.findAll();
    res.render(
        "base", {
            title: "Listar Alunos",
            view: "alunos/show",
            alunos,
    });
});

// Adicionar novo aluno - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Aluno",
            view: "alunos/add",
    });
});

// Adicionar novo aluno - no BD
router.post("/add", async(req, res) =>{
    await Aluno.create({nome: req.body.nome});
    res.redirect("/alunos");
});

// Editar aluno - formulário
router.get("/edit/:id", async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Aluno",
            view: "alunos/edit",
            aluno,
    });
});

// Editar aluno - no BD
router.post("/edit/:id", async(req, res) =>{
    await Aluno.update(
        {nome: req.body.nome},
        {where:{id: req.params.id}}
    );
    res.redirect("/alunos");
});

// Excluir aluno
router.post("/delete/:id", async(req, res) =>{
    await Aluno.destroy({where:{id: req.params.id}});
    res.redirect("/alunos");
});

module.exports = router;
