const sequelize = require('../config/database');

const db = {};

db.sequelize = sequelize;

// Carrega os modelos
db.User = require('./User.js')(sequelize);
db.Ticket = require('./Ticket.js')(sequelize);

module.exports = db;