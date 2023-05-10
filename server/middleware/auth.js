require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (request, response, next) => {
  const token = request.header("Authorization");

  if (!token) {
    return response.status(403).json({ error: "Invalid token" });
  }
  try {
    jwt.verify(token.slice(7), process.env.jwt_secret, [
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

module.exports = { auth };
