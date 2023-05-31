require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express(); // initializing

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const createToken = require("./jwt-token/generateToken");
const jwt = require("jsonwebtoken");
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

//DISPLAY BUSINESS TO HOME PAGE
app.get("/get-newest-business", (request, response) => {
  // pool.query("SELECT * FROM photos", (error, results) => {
  pool.query(
    "SELECT b.business_id, b.business_name, p.photo, p.photo_priority, MAX(p.created_at) AS latest_photo_created_at FROM businesses AS b JOIN photos AS p ON b.business_id = p.business_id WHERE p.created_at >= NOW() - INTERVAL '7 days' GROUP BY b.business_id, b.business_name, p.photo, p.photo_priority ORDER BY latest_photo_created_at DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
});

//DISPLAY BUSINESS INFO FOR OWNER
app.get("/get-business/:id", auth.verifyToken, (request, response) => {
  // console.log(
  //   request,
  //   "REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG"
  // );
  const id = request.params.id;
  console.log(id, "FROM GET BUSINESS id request params");
  if (id) {
    pool.query(
      "SELECT * FROM businesses WHERE user_id = $1",
      [id],
      (error, results) => {
        if (error) {
          console.log(error, "IM GET BUSINESS ERROR");
          // throw error;
          response.status(404);
        }
        response.status(200).send(results);
      }
    );
  } else {
    response.status(400);
  }
});
//DISPLAY TO PUBLIC
app.get("/get-business-public/:id", (request, response) => {
  console.log(
    request,
    "REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG REQUEST LOG"
  );
  const id = request.params.id;
  console.log(id, "FROM GET BUSINESS id request params");
  pool.query(
    "SELECT * FROM businesses WHERE business_id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.log(error, "IM GET BUSINESS ERROR");
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});

//DISPLAY TO SEARCH BAR
app.get("/all-businesses", (request, response) => {
  pool.query(
    "SELECT * FROM businesses INNER JOIN photos ON businesses.business_id = photos.business_id WHERE photos.photo_priority = 1;",
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
//SIGN UP / CREATION OF USER
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

app.post("/auth/verifyToken", (request, response) => {
  const jwt_token = request.body.jwt_token;
  console.log(jwt_token, "IM JWT FROM AUTH VERIFY TOKEN ");
  try {
    const decode = jwt.verify(jwt_token, process.env.jwt_secret);
    console.log(decode, " HI IM DECODE ");
    return response.status(200).send({
      email: decode.user_email,
      role: decode.role,
      user_id: decode.user_id,
    });
  } catch (error) {
    console.log(error);
    return response.status(401).send("fsfsf");
  }
});

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

//CREATE BUSINESSES
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
    "INSERT INTO photos (photo, business_id, photo_priority, created_at) VALUES($1, $2, $3, NOW())",
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
//FETCH PICTURE OF BUSINESS TO DISPLAY FOR THE USER/OWNER
app.get("/get-picture/:id", auth.verifyToken, (request, response) => {
  const id = request.params.id;
  console.log(
    request,
    "IM FROM GET PICTURE IM FROM GET PICTURE IM FROM GET PICTURE"
  );
  console.log(
    response,
    "RESPONSE GET PICTURE RESPONSE GET PICTURE RESPONSE GET PICTURE"
  );
  pool.query(
    "SELECT * FROM photos WHERE business_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results.rows);
    }
  );
});

//FETCH PICTURE OF BUSINESS TO DISPLAY PUBLIC
app.get("/get-picture-public/:id", (request, response) => {
  const id = request.params.id;
  console.log(
    request,
    "IM FROM GET PICTURE IM FROM GET PICTURE IM FROM GET PICTURE"
  );
  console.log(
    response,
    "RESPONSE GET PICTURE RESPONSE GET PICTURE RESPONSE GET PICTURE"
  );
  pool.query(
    "SELECT * FROM photos WHERE business_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results.rows);
    }
  );
});

app.put("/update-business-info/:id", auth.verifyToken, (request, response) => {
  // const id = request.params.id;
  const {
    business_name,
    business_type,
    business_address,
    business_contacts,
    business_socials,
    business_email,
    business_description,
    business_id,
  } = request.body;
  pool.query(
    "UPDATE businesses SET business_name = $1 ,business_type = $2,business_address = $3,business_contact = $4,business_socials = $5,business_email =$6,business_description = $7 WHERE business_id = $8 ",
    [
      business_name,
      business_type,
      business_address,
      business_contacts,
      business_socials,
      business_email,
      business_description,
      business_id,
    ],
    (error, results) => {
      if (error) {
        console.log(error, "This is from Error update business");
        throw error;
      }
      console.log(results, "This is from results update business");
      response.status(200).send(results);
    }
  );
});

//Display comments to admin
app.get("/get-all-comments", (request, response) => {
  pool.query(
    "SELECT * FROM comments WHERE status = 'pending' ", // must have the ' ' for it to work
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results);
    }
  );
});

app.get("/get-comments/:id", (request, response) => {
  const id = request.params.id;
  pool.query(
    "SELECT * FROM comments JOIN users ON comments.user_id = users.user_id WHERE business_id = $1 AND comments.status = 'approved'",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results.rows);
    }
  );
});
//DELETE CHANGED TO HAVING IT REJECTED INSTEAD, to keep comments in the databas
// app.delete("/delete-comment/:id", auth.verifyToken, (request, response) => {
//   if (request.user.role !== "admin") {
//     return response.status(403).json({ message: "Forbidden" });
//   }
//   const id = request.params.id;
//   pool.query(
//     "DELETE FROM comments WHERE comment_id = $1",
//     [id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send("Comment deleted");
//     }
//   );
// });

app.patch("/update-comment/:id", auth.verifyToken, (request, response) => {
  if (request.user.role !== "admin") {
    return response.status(403).json({ message: "Forbidden" });
  }
  // const id = request.params.id;
  const { id } = request.params; //deconstruction of the code above
  const { status } = request.body;
  pool.query(
    "UPDATE comments SET status = $1 WHERE comment_id = $2",
    [status, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("Comment updated");
    }
  );
});
// read on Restful api
app.post("/comment", auth.verifyToken, (request, response) => {
  console.log(request.body, "HI IM COMMENT BODY LOGS");
  const { comment, business_id } = request.body;
  // const comment = request.body.comment
  // const business_id = request.body.business_id
  pool.query(
    "INSERT INTO comments (comment, business_id, user_id, created_at) VALUES($1, $2, $3, NOW())",
    [comment, business_id, request.user.user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("Comment added");
    }
  );
});

// app.delete("/delete-business/:id", (request, response) => {
//   const id = request.params.id;

//   pool.query("DELETE FROM users WHERE user_id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send();
//   });
// });
// put
// app.put("/update-user/:id", (request, response) => {
//   const id = request.params.id;
//   const { name, email } = request.body;

//   pool.query(
//     "UPDATE users SET name = $1, email = $2 WHERE user_id = $3",
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send("User updated");
//     }
//   );
// });

// delete
//check role for security must be an admin
// app.delete("/delete-user/:id", (request, response) => {
//   const id = request.params.id;

//   pool.query("DELETE FROM users WHERE user_id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User with user_id = ${id} is deleted.`);
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}...`);
});
