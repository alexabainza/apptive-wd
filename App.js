const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

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
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
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

app.get("/:user_id/dashboard", (req, res) => {
  const userId = req.params.user_id;

  conn.query(
    "SELECT * FROM folders f WHERE f.user_id = ? ORDER BY created_at DESC",
    [userId],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          error: "unexpected_error",
          message: error.message,
        });
      } else {
        if (data.length > 0) {
          const user = data;
          res.status(200).json({ success: true, user });
        } else {
          // Modify the response to include a specific message when there are no folders
          res.status(200).json({
            success: true,
            message: "User has no folders yet",
          });
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
      console.log(data);
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

app.post("/:user_id/dashboard/addFolder", (req, res) => {
  const userId = req.params.user_id;
  const { folderName } = req.body;

  const folderId = `${userId}_${uuidv4()}`;

  conn.query(
    "INSERT INTO folders (folder_id, user_id, folder_name) VALUES (?, ?, ?)",
    [folderId, userId, folderName],
    (error, data) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
      } else {
        res
          .status(201)
          .json({ success: true, message: "Folder added successfully" });
      }
    }
  );
});

app.patch("/:user_id/dashboard/updateFolder/:folder_id", (req, res) => {
  const userId = req.params.user_id;
  const folderId = req.params.folder_id;

  const { newFolderName } = req.body;

  conn.query(
    "UPDATE folders SET folder_name = ?, modified_at = NOW() WHERE user_id = ? AND folder_id = ?",
    [newFolderName, userId, folderId],

    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          error: "unexpected_error",
          message: error.message,
        });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: "Folder updated successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Folder not found",
          });
        }
      }
    }
  );
});

app.delete("/:user_id/dashboard/deleteFolder/:folder_id", (req, res) => {
  const userId = req.params.user_id;
  const folderId = req.params.folder_id;

  conn.query(
    "DELETE FROM folders WHERE user_id = ? AND folder_id = ?",
    [userId, folderId],
    (error, data) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Folder deleted successfully" });
      }
    }
  );
});

app.get("/:user_id/:folder_name", (req, res) => {
  const folder_name = req.params.folder_name;
  const user_id = req.params.user_id;
  console.log("fldskfdsgsdg");
  conn.query(
    "SELECT f.folder_name, n.* FROM notes n INNER JOIN folders f ON f.folder_id = n.folder_id WHERE n.user_id = ? AND f.user_id = ? AND f.folder_name = ?",
    [user_id, user_id, folder_name],
    (error, data) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(data);
        console.log(data);
      }
    }
  );
});

app.get("/:user_id/:folder_name/:notes_id", (req, res) => {
  const folder_name = req.params.folder_name;
  const user_id = req.params.user_id;
  const note_id = req.params.notes_id;
  conn.query(
    "SELECT n.* FROM notes n INNER JOIN folders f ON f.folder_id = n.folder_id WHERE n.user_id = ? AND f.user_id = ? AND f.folder_name = ? AND n.notes_id = ?",
    [user_id, user_id, folder_name, note_id],

    (error, data) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        if (data.length === 0) {
          res.status(404).send("Note not found");
        } else {
          res.setHeader("Content-Type", "application/json");
          const note = data[0]; // Assuming there is only one matching note
          res.json(note);
          // console.log(note);
        }
      }
    }
  );
});

app.post("/:user_id/:folder_name/addNote", (req, res) => {
  const userId = req.params.user_id;
  const folderName = req.params.folder_name;
  console.log(req.body); // Log the request body to check if it's received correctly

  const note_id = `${userId}_${uuidv4()}_${uuidv4()}`;
  conn.query(
    "SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = ?",
    [userId, folderName],
    (error, result) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
      } else {
        if (result.length > 0) {
          const folderId = result[0].folder_id;
          conn.query(
            "INSERT INTO notes(user_id, folder_id, notes_id, note_title, contents) VALUES (?, ?, ?, ?, ?)",
            [userId, folderId, note_id, req.body.noteTitle, req.body.contents],
            (error, data) => {
              if (error) {
                console.error(error);
                res
                  .status(500)
                  .json({ error: "unexpected_error", message: error.message });
              } else {
                res
                  .status(201)
                  .json({ success: true, message: "Note added successfully" });
              }
            }
          );
        } else {
          res
            .status(404)
            .json({ error: "folder_not_found", message: "Folder not found" });
        }
      }
    }
  );
});

app.delete("/:user_id/:folder_name/delete/:note_id", (req, res) => {
  const userId = req.params.user_id;
  const folderName = req.params.folder_name;
  const note_id = req.params.note_id;

  // Query to get folder_id based on folder_name
  conn.query(
    "SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = ?",
    [userId, folderName],
    (error, result) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
      } else {
        if (result.length > 0) {
          const folderId = result[0].folder_id;
          conn.query(
            "DELETE FROM notes WHERE user_id = ? AND folder_id = ? AND notes_id = ?",
            [userId, folderId, note_id],
            (error, data) => {
              if (error) {
                console.error(error);
                res
                  .status(500)
                  .json({ error: "unexpected_error", message: error.message });
              } else {
                res
                  .status(201)
                  .json({
                    success: true,
                    message: "Note deleted successfully",
                  });
              }
            }
          );
        } else {
          res
            .status(404)
            .json({ error: "note_not_found", message: "Folder not found" });
        }
      }
    }
  );
});
app.patch("/:user_id/:folder_name/:note_id/updateNote", (req, res) => {
  const userId = req.params.user_id;
  const folderName = req.params.folder_name;
  const noteId = req.params.note_id;

  conn.query(
    "SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = ?",
    [userId, folderName],
    (error, result) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
      } else {
        if (result.length > 0) {
          const folderId = result[0].folder_id;
          conn.query(
            "UPDATE notes SET note_title = ?, contents = ?, modified_at = NOW() WHERE user_id = ? AND folder_id = ? AND notes_id = ?",
            [req.body.note_title, req.body.contents, userId, folderId, noteId],
            (updateError, data) => {
              if (updateError) {
                console.error(updateError);
                res
                  .status(500)
                  .json({ error: "unexpected_error", message: updateError.message });
              } else {
                if (data.affectedRows > 0) {
                  res.status(200).json({
                    success: true,
                    message: "Note updated successfully",
                  });
                } else {
                  res.status(404).json({
                    success: false,
                    message: "Note not found",
                  });
                }
              }
            }
          );
        } else {
          res.status(404).json({
            error: "folder_not_found",
            message: "Folder not found",
          });
        }
      }
    }
  );
});
