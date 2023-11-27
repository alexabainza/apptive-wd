const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apptive",
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/getUsers", (req, res) => {
  conn.query(`SELECT * FROM user_credentials`, (error, data) => {
    console.log(error);
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/register", (req, res) => {
  const { id, username, firstname, lastname, email, password } = req.body;

  conn.query(
    "INSERT INTO user_credentials (`user_id`, `user_name`, `firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?)",
    [id, username, firstname, lastname, email, password],
    (error, data) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error occurred while registering user" });
      } else {
        console.log("User registered successfully");
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  );
});


app.get("/:user_id", (req, res) => {
  const userId = req.params.user_id;

  conn.query(
    "SELECT * FROM user_credentials WHERE user_id = ?",
    [userId],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "unexpected_error", message: error.message });
      } else {
        if (data.length > 0) {
          const user = data[0];
          res.status(200).json({ success: true, user });
        } else {
          res.status(404).json({ success: false, message: "User not found" });
        }
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  conn.query(
    "SELECT user_id FROM user_credentials WHERE user_name = ? AND password = ?",
    [username, password],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error: "unexpected_error",
          message: error.message,
        });
      } else {
        if (data.length > 0) {
          const userId = data[0].user_id;
          res.status(200).json({
            success: true,
            message: "Login successful",
            user_id: userId, // Include user_id in the response
          });
        } else {
          // User not found or password does not match
          res.status(401).json({
            success: false,
            error: "invalid_credentials",
            message: "Invalid username or password",
          });
        }
      }
    }
  );
});
