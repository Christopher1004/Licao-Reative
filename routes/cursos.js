const express = require("express");

const router = express.Router();

const { Curso, Aluno } = require("../models"); // Ajuste o caminho conforme necessário

// Mostrar todos os cursos
router.get("/", async (req, res) => {
    try {
        const cursos = await Curso.findAll({
            include: [{ model: Aluno, as: "Aluno" }],
        });

        res.render("base", {
            title: "Cursos",
            view: "cursos/show",
            cursos,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar cursos");
    }
});

// Formulário para adicionar um novo curso
router.get("/add", async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        res.render("base", {
            title: "Add Curso",
            view: "cursos/add",
            alunos,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar alunos");
    }
});

// Adicionar um novo curso
router.post("/add", async (req, res) => {
    try {
        const { nome, valor, alunoId } = req.body;
        await Curso.create({
            nome,
            valor,
            alunoId,
        });
        res.redirect("/cursos");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao adicionar curso");
    }
});

// Formulário para editar um curso
router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id, {
            include: [{ model: Aluno, as: "Aluno" }],
        });
        const alunos = await Aluno.findAll();
        if (curso) {
            res.render("base", {
                title: "Edit Curso",
                view: "cursos/edit",
                curso,
                alunos,
            });
        } else {
            res.status(404).send("Curso não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar curso");
    }
});

// Atualizar um curso
router.post("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, valor, alunoId } = req.body;
        const curso = await Curso.findByPk(id);
        if (curso) {
            await curso.update({ nome, valor, alunoId });
            res.redirect("/cursos");
        } else {
            res.status(404).send("Curso não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar o curso");
    }
});

// Deleta um curso
router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if (curso) {
            await curso.destroy();
            res.redirect("/cursos");
        } else {
            res.status(404).send("Curso não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir curso");
    }
});

module.exports = router;
