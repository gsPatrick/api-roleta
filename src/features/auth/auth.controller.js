const authService = require('./auth.service');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await authService.login(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();