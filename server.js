// server.js (VERSÃO FINAL COM CREDENCIAIS ATUALIZADAS)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const allRoutes = require('./src/routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Roteador principal da API
app.use('/api', allRoutes);

const PORT = process.env.PORT || 5000;

// Função para iniciar o servidor e o banco de dados
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com PostgreSQL estabelecida com sucesso.');

    // Sincroniza os modelos com o banco de dados
    await db.sequelize.sync(); 
    console.log('Modelos sincronizados com o banco de dados.');

    // ✨✨✨ SEEDING ATUALIZADO COM AS NOVAS CREDENCIAIS ✨✨✨
    const [user, created] = await db.User.findOrCreate({
      where: { email: 'boleirospremium@gmail.com' },
      defaults: {
        password: 'M@rquito10',
      },
    });

    // Se o usuário já existia, podemos opcionalmente atualizar a senha
    // Em um ambiente real, isso não seria necessário, mas é bom para garantir
    if (!created) {
        console.log('Usuário admin já existe.');
    } else {
        console.log('Usuário admin criado com sucesso.');
    }
    
    // FIM DA ATUALIZAÇÃO

    await db.Ticket.findOrCreate({
      where: { id: 1 },
      defaults: {
        url: '#',
      },
    });
    console.log('Bilhete inicial garantido.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

startServer();