const jwt = require("jsonwebtoken");
const secret = "Aayushmaan@1234";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    password: user.password,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const user = jwt.verify(token, secret);
  return user;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
