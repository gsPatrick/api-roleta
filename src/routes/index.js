const express = require('express');
const router = express.Router();

const authRoutes = require('../features/auth/auth.routes');
const ticketRoutes = require('../features/tickets/ticket.routes');

router.use(authRoutes);
router.use(ticketRoutes);

module.exports = router;