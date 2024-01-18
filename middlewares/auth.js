const { validateToken } = require("../services/auth");

function checkForAuthentication(cookieName) {
  return (req, res, next) => {
    const tokenVal = req.cookies[cookieName];
    if (!tokenVal) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenVal);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = {
  checkForAuthentication,
};
