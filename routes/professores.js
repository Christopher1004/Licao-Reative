const express = require("express");

const router = express.Router();

const { Professor, Escola } = require("../models"); // Ajuste o caminho conforme necessário

// Mostrar todos os professores
router.get("/", async (req, res) => {
    try {
        const professores = await Professor.findAll({
            include: [{ model: Escola, as: "Escola" }],
        });

        res.render("base", {
            title: "Professores",
            view: "professores/show",
            professores,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar professores");
    }
});

// Formulário para adicionar um novo professor
router.get("/add", async (req, res) => {
    try {
        const escolas = await Escola.findAll();
        res.render("base", {
            title: "Add Professor",
            view: "professores/add",
            escolas,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar escolas");
    }
});

// Adicionar um novo professor
router.post("/add", async (req, res) => {
    try {
        const { nome, valor, escolaId } = req.body;
        await Professor.create({
            nome,
            valor,
            escolaId,
        });
        res.redirect("/professores");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao adicionar professor");
    }
});

// Formulário para editar um professor
router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const professor = await Professor.findByPk(id, {
            include: [{ model: Escola, as: "Escola" }],
        });
        const escolas = await Escola.findAll();
        if (professor) {
            res.render("base", {
                title: "Edit Professor",
                view: "professores/edit",
                professor,
                escolas,
            });
        } else {
            res.status(404).send("Professor não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar professor");
    }
});

// Atualizar um professor
router.post("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, valor, escolaId } = req.body;
        const professor = await Professor.findByPk(id);
        if (professor) {
            await professor.update({ nome, valor, escolaId });
            res.redirect("/professores");
        } else {
            res.status(404).send("Professor não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar o professor");
    }
});

// Deleta um professor
router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const professor = await Professor.findByPk(id);
        if (professor) {
            await professor.destroy();
            res.redirect("/professores");
        } else {
            res.status(404).send("Professor não encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir professor");
    }
});

module.exports = router;
