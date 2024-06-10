const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    cor: {
        type: String,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    dataCadastro: {
        type: Date,
        required: true,
    },
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
