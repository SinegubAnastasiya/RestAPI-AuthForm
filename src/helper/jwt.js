const jwt = require('jsonwebtoken');
function createToken() {
  const secret = process.env.JWT_SECRET;

  return jwt.sign({}, secret);
}

module.exports = { createToken };
