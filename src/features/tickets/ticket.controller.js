const ticketService = require('./ticket.service');

class TicketController {
  async getTicket(req, res) {
    try {
      const ticket = await ticketService.getTicket();
      res.json({ url: ticket.url });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateTicket(req, res) {
    const { url } = req.body;
    try {
      const updatedTicket = await ticketService.updateTicket(url);
      res.json({ message: 'Bilhete atualizado com sucesso!', ticket: updatedTicket });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TicketController();