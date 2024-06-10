const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Adicionando o CORS
const server = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Loja de Departamentos API',
            version: '1.0.0',
            description: 'API para gerenciar produtos de uma loja de departamentos',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configurando CORS
server.use(cors());

const produtoRoutes = require('./routes/produtosRoutes');

server.use(
    express.urlencoded({
        extended: true,
    }),
);
server.use(express.json());

// Criando o endpoint e rotas da minha API
server.use('/', produtoRoutes);

const DB_USER = 'robertopapacidero';
const DB_PASSWORD = '12345';

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ygxw76a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log(err);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
