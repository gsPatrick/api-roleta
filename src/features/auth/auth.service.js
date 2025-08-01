const jwt = require('jsonwebtoken');
const { User } = require('../../models');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return token;
  }
}

module.exports = new AuthService();