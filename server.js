// server.js (VERSÃO FINAL COM CORS ABERTO E CREDENCIAIS CORRETAS)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/models/index');
const allRoutes = require('./src/routes/index');

const app = express();

// Middlewares
// ✨✨✨ CORS HABILITADO PARA QUALQUER ORIGEM ✨✨✨
app.use(cors()); 

app.use(express.json()); // Permite que a API entenda o corpo de requisições em JSON

// Roteador principal da API
app.use('/api', allRoutes);

const PORT = process.env.PORT || 5000;

// Função para iniciar o servidor e o banco de dados
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com PostgreSQL estabelecida com sucesso.');

    // Sincroniza os modelos com o banco de dados. 
    // Em um ambiente de produção, considere usar migrations.
    await db.sequelize.sync(); 
    console.log('Modelos sincronizados com o banco de dados.');

    // SEEDING: Garante que o usuário admin e o bilhete inicial existam
    const [user, created] = await db.User.findOrCreate({
      where: { email: 'boleirospremium@gmail.com' },
      defaults: {
        password: 'M@rquito10',
      },
    });

    if (!created) {
        console.log('Usuário admin "boleirospremium@gmail.com" já existe.');
    } else {
        console.log('Usuário admin "boleirospremium@gmail.com" criado com sucesso.');
    }

    await db.Ticket.findOrCreate({
      where: { id: 1 },
      defaults: {
        url: 'https://seulinkpadrao.com',
      },
    });
    console.log('Bilhete inicial garantido.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados ou iniciar o servidor:', error);
  }
};

startServer();