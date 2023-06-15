const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.status(200).json({ status: "Halo!" });
});

const pool = mysql.createPool({
  user: DB_USER,
  password: DP_PASS,
  database: DB_NAME,
  socketPath: `/cloudsql/${INSTANCE_CONNECTION_NAME}`,
});

app.post("/api/v1/register", async (req, res) => {
  const data = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  if (data.password !== data.confirmPassword) {
    res.status(400).json({ status: "failure", reason: "Passwords do not match" });
    return;
  }

  const emailQuery = "SELECT * FROM users WHERE email = ?";
  pool.query(emailQuery, [data.email], (emailError, emailResults) => {
    if (emailError) {
      res.status(500).json({ status: "failure", reason: emailError.code });
    } else if (emailResults.length > 0) {
      res.status(400).json({ status: "failure", reason: "Email already exists" });
    } else {
      bcrypt.hash(data.password, 10, (hashError, hashedPassword) => {
        if (hashError) {
          res.status(500).json({ status: "failure", reason: hashError.code });
        } else {
          data.password = hashedPassword;

          const query = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
          pool.query(query, [data.fullname, data.email, data.password], (error) => {
            if (error) {
              res.status(500).json({ status: "failure", reason: error.code });
            } else {
              res.status(200).json({ status: "success", data: data });
            }
          });
        }
      });
    }
  });
});

app.post("/api/v1/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = "SELECT * FROM users WHERE email = ?";
  pool.query(query, [email], (error, results) => {
    if (error) {
      res.status(500).json({ status: "failure", reason: error.code });
    } else if (!results[0]) {
      res.status(404).json({ status: "failure", reason: "User not found" });
    } else {
      bcrypt.compare(password, results[0].password, (compareError, isMatch) => {
        if (compareError) {
          res.status(500).json({ status: "failure", reason: compareError.code });
        } else if (!isMatch) {
          res.status(401).json({ status: "failure", reason: "Invalid password" });
        } else {
          const token = jwt.sign({ email: results[0].email }, SECRET_KEY, { expiresIn: '1h' });
          res.status(200).json({ status: "success", token: token });
        }
      });
    }
  });
});

app.get("/api/v1/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).json({ status: "failure", reason: error.code });
    } else {
      res.status(200).json({ status: "success", message: "Logged out successfully" });
    }
  });
});
