const bcrypt = require("bcrypt");

class User {
  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async verifyPassword(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
  }
}

module.exports = User;
