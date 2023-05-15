require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express(); // initializing

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const createToken = require("./jwt-token/generateToken");
const PORT = 8000;
const auth = require("./middleware/auth");

const Pool = require("pg").Pool; // initializing

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// get, put, post, delete
app.get("/", (request, response) => {
  response.json("Hello World! huehue");
});

// get all data from table
app.get("/all-users", auth.verifyToken, (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.get("/get-user/:id", (request, response) => {
  const id = request.params.id;

  pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});

// post
// now encrypted
app.post("/add-user", async (request, response) => {
  const { first_name, last_name, user_email, password } = request.body;
  const encryptedPassword = await bcrypt.hashSync(password, 10);
  await pool.query(
    "INSERT INTO users (first_name, last_name, user_email, password) VALUES ($1,$2,$3,$4)",
    [first_name, last_name, user_email, encryptedPassword],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      const token = createToken({
        ...request.body,
        password: encryptedPassword,
      });
      response.status(201).send(token);
    }
  );
  // const token = createToken(newUser.rows[0]); //added during JWT session
  // response.json({ token });
  // console.log(newUser);
});

// verification
app.post("/auth", (request, response) => {
  const { user_email, password } = request.body;

  pool.query(
    "SELECT password FROM users WHERE user_email = $1",
    [user_email],
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(results.rows[0].password);
      const dbPassword = results.rows[0].password;
      const isVerified = bcrypt.compareSync(password, dbPassword);
      if (isVerified) {
        const token = createToken({ ...request.body, password: dbPassword }); //never store password in token
        // const token = createToken({ ...request.body, password: dbPassword }); //never store password in token
        response.status(200).send(token);
      } else {
        response.status(401).send();
      }
      // console.log(isVerified);
    }
  );
});

// put
app.put("/update-user/:id", (request, response) => {
  const id = request.params.id;
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE user_id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("User updated");
    }
  );
});

// delete
app.delete("/delete-user/:id", (request, response) => {
  const id = request.params.id;

  pool.query("DELETE FROM users WHERE user_id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User with user_id = ${id} is deleted.`);
  });
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}...`);
});
