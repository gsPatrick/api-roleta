const { Ticket } = require('../../models');

class TicketService {
  async getTicket() {
    const ticket = await Ticket.findByPk(1);
    if (!ticket) {
      throw new Error('Nenhum bilhete encontrado.');
    }
    return ticket;
  }

  async updateTicket(url) {
    if (!url) {
      throw new Error('O campo URL é obrigatório.');
    }
    const ticket = await Ticket.findByPk(1);
    if (!ticket) {
      throw new Error('Bilhete não encontrado para atualizar.');
    }

    ticket.url = url;
    await ticket.save();
    return ticket;
  }
}

module.exports = new TicketService();