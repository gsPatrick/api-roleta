const express = require('express');
const router = express.Router();
const ticketController = require('./ticket.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/ticket', ticketController.getTicket);
router.put('/ticket', authMiddleware, ticketController.updateTicket);

module.exports = router;