require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express(); // initializing

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const createToken = require("./jwt-token/generateToken");
const PORT = 8000;
const auth = require("./middleware/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const Pool = require("pg").Pool; // initializing

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
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

//DISPLAY BUSINESS INFO FOR OWNER
app.get("/get-business/:id", auth.verifyToken, (request, response) => {
  console.log(
    request,
    "REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG"
  );
  const id = request.params.id;
  console.log(id, "FROM GET BUSINESS id request params");
  pool.query(
    "SELECT * FROM businesses WHERE user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.log(error, "IM GET BUSINESS ERROR");
        throw error;
      }
      response.status(200).send(results);
    }
  );
});

// post
// now encrypted
app.post("/add-user", async (request, response) => {
  const { first_name, last_name, user_email, password } = request.body;
  const encryptedPassword = await bcrypt.hashSync(password, 10);
  // const userRole = "user"
  await pool.query(
    "INSERT INTO users (first_name, last_name, user_email, password) VALUES ($1,$2,$3,$4) RETURNING user_id, user_email, role", // return allows us to use the value
    [first_name, last_name, user_email, encryptedPassword],
    (error, results) => {
      if (error) {
        throw error;
      }
      const user = results.rows[0];
      console.log(results);
      // const token = createToken({
      //   ...request.body,
      //   password: encryptedPassword,
      // });
      const token = createToken(user);
      response.status(201).send({
        token,
        user: {
          user_id: user.user_id,
          role: user.role,
          user_email: user.user_email,
        },
      });
    }
  );
  // const token = createToken(newUser.rows[0]); //added during JWT session
  // response.json({ token });
  // console.log(newUser);
});

// app.post("/auth/verifyToken", (request, response) => {
//   const jwt_token = request.body.jwt_token;

//   try {
//     const decode = jwt.verify(jwt_token, process.env.jwt_secret);
//     console.log(decode);
//     return response.status(200).send({
//       email: decode.email,
//       password: decode.password,
//     });
//   } catch (error) {
//     console.log(error);
//     return response.status(401).send("fsfsf");
//   }
// });

// VERIFICATION
app.post("/auth", (request, response) => {
  const { user_email, password, user_id, role } = request.body;

  pool.query(
    "SELECT password, user_id, role, user_email FROM users WHERE user_email = $1",
    [user_email],
    (error, results) => {
      console.log(results, "this is from auth endpoint");
      if (error) {
        throw error;
      }
      // console.log(results.rows[0].password);
      const user = results.rows[0];
      const dbPassword = user.password;
      const isVerified = bcrypt.compareSync(password, dbPassword);
      if (isVerified) {
        const token = createToken(user); //never store password in token
        // const token = createToken({ ...request.body, role }); //never store password in token
        // const token = createToken({ ...request.body, password: dbPassword }); //never store password in token
        response.status(200).send({
          token,
          user: {
            user_id: user.user_id,
            role: user.role,
            user_email: user.user_email,
          },
        });
      } else {
        response.status(401).send();
      }
      // console.log(isVerified);
    }
  );
});

//create businesses
// app.use(auth.verifyToken);
app.post("/add-business", auth.verifyToken, async (request, response) => {
  console.log(request.user.user_id, "this is request log");
  const {
    business_name,
    business_type,
    business_address,
    business_contacts,
    business_socials,
    business_email,
    business_description,
  } = request.body;
  pool.query(
    "INSERT INTO businesses (business_name, business_type,business_address,business_contact,business_socials,business_email,business_description, user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING business_id",
    [
      business_name,
      business_type,
      business_address,
      business_contacts,
      business_socials,
      business_email,
      business_description,
      request.user.user_id,
    ],
    (error, results) => {
      const businessId = results.rows[0].business_id;
      if (error) {
        throw error;
      } else {
        response.status(201).send({ businessId: businessId });
      }
    }
  );
});
//goes to cloudinary
app.post("/upload-picture", upload.single("file"), (request, response) => {
  //provided by cloudinary docs
  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        response.status(500).json({ message: "Server error" });
      } else {
        response.json(result);
      }
    })
    .end(request.file.buffer);
});
//To insert the cloudinary url into the database
app.post("/create-picture", auth.verifyToken, (request, response) => {
  const { photo, business_id, photo_priority } = request.body;
  pool.query(
    "INSERT INTO photos (photo, business_id, photo_priority) VALUES($1, $2, $3)",
    [photo, business_id, photo_priority],
    (error, results) => {
      // const businessId = results.rows[0].business_id;
      if (error) {
        throw error;
      } else {
        response.status(201).send();
      }
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
//check role for security must be an admin
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
