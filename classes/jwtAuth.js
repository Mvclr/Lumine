const jwt = require("jsonwebtoken");

class JWTAuth {
  #secretKey;

  constructor(secretKey) {
    this.#secretKey = secretKey;
  }

  getSecretKey() {
    return this.#secretKey;
  }
  setSecretKey(value) {
    this.#secretKey = value;
  }
  generateToken(payload, expiresIn = "1h") {
    return jwt.sign(payload, this.#secretKey, { expiresIn });
  }

  verifyToken(token) {
    return jwt.verify(token, this.#secretKey);
  }
}

module.exports = JWTAuth;
