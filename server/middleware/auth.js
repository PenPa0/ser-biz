require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(403).json({ error: "Invalid token" });
  }
  try {
    jwt.verify(token.split(" ")[1], process.env.jwt_secret, [
      options,
      (error, user) => {
        if (error) {
          return response.sendStatus(403);
        }
        request.user = user;
        next();
      },
    ]);
    //token.slice(7) to cut off the space from bearer, read http authorization bearer
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyToken };
