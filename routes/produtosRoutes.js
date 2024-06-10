const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *         - cor
 *         - peso
 *         - tipo
 *         - preco
 *         - dataCadastro
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-gerado do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         cor:
 *           type: string
 *           description: Cor do produto
 *         peso:
 *           type: number
 *           description: Peso do produto
 *         tipo:
 *           type: string
 *           description: Tipo do produto
 *         preco:
 *           type: number
 *           description: Preço do produto
 *         dataCadastro:
 *           type: string
 *           format: date
 *           description: Data de cadastro do produto
 *       example:
 *         nome: "Cerveja"
 *         descricao: "Cerveja artesanal"
 *         cor: "Amarela"
 *         peso: 0.5
 *         tipo: "Bebida"
 *         preco: 10.0
 *         dataCadastro: "2023-06-01"
 */

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       422:
 *         description: Todos os campos são obrigatórios
 *       500:
 *         description: Erro no servidor
 */
router.post('/produto', async (req, res) => {
    const { nome, descricao, cor, peso, tipo, preco, dataCadastro } = req.body;
    if (!nome || !descricao || !cor || !peso || !tipo || !preco || !dataCadastro) {
        return res.status(422).json({ error: 'Todos os campos são obrigatórios!' });
    }
    const produto = new Produto({ nome, descricao, cor, peso, tipo, preco, dataCadastro });
    try {
        await produto.save();
        res.status(201).json({ message: 'Produto criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /produto:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produto]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/produto', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /produto/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/produto/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       422:
 *         description: Todos os campos são obrigatórios
 *       500:
 *         description: Erro no servidor
 */
router.put('/produto/:id', async (req, res) => {
    const { nome, descricao, cor, peso, tipo, preco, dataCadastro } = req.body;
    if (!nome || !descricao || !cor || !peso || !tipo || !preco || !dataCadastro) {
        return res.status(422).json({ error: 'Todos os campos são obrigatórios!' });
    }
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso!', produto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /produto/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/produto/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
