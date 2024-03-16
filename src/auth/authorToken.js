// verify Token
const jwt = require("jsonwebtoken");

const verifyAuthorToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1]; // Bearer <token>

    jwt.verify(token, process.env.SECRET_KEY_AUTHOR, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user.author;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = verifyAuthorToken;
