require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  console.log(user);
  console.log(process.env.jwt_secret);
  // return jwt.sign(user, process.env.jwt_secret, { expiresIn: "1h" });
  return jwt.sign(user, process.env.jwt_secret, { expiresIn: "1h" });
};

module.exports = createToken;
