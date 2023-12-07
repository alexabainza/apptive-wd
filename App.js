const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: generateUniqueId } = require("uuid"); // Add this line

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
app.post("/register", async (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;

  try {
    // Check if the username already exists
    const [existingUser] = await conn.promise().query(
      "SELECT * FROM user_credentials WHERE user_name = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Username already exists.",
        field: "username"
      });
    }

    // Check if the email is already in use
    const [existingEmail] = await conn.promise().query(
      "SELECT * FROM user_credentials WHERE email = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({
        message: "Email already linked to another account.",
        field: "email"
      });
    }

    // If username and email are not taken, proceed with user registration
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await conn.promise().query(
      "INSERT INTO user_credentials (`user_id`, `user_name`, `firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?)",
      [id, username, firstname, lastname, email, hashedPassword]
    );

    console.log("User registered successfully");
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while registering user",
    });
  }
});




  
app.post("/login", async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  conn.query(
    "SELECT user_id, user_name, password FROM user_credentials WHERE user_name = ?",
    [username],
    async (error, data) => {
      console.log("Query Result:", data);
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error: "unexpected_error",
          message: error.message,
        });
      } 
      if (data.length>0){
        const storedPassword = data[0].password;

        const isMatch = await bcrypt.compare(password, storedPassword)

        if(isMatch){
          res.status(200).json({
            success: true,
            user_id: data[0].user_id,
            username: data[0].user_name,
            message: "Login successful",
          });
        }
        else{
          console.log("Incorrect Password:", password);
          res.status(401).json({ success: false, message: "Incorrect password" });
        }
      }
      else{
        res.status(404).json({ success: false, message: "User not found" });

      }
    }
  );
});


app.get("/guestDashboard", (req, res) => {
  console.log("Request received at /guestDashboard");

  conn.query("SELECT n.*, uc.user_name AS user_name, f.folder_name AS folder_name FROM notes n JOIN user_credentials uc ON n.user_id = uc.user_id JOIN folders f ON n.folder_id = f.folder_id WHERE n.isPublic = 1", (error, data) => {

    if (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Unexpected error",
      });
    } else {
      console.log("Fdsffd")

      console.log(data); // Log the data for debugging
      if (data.length > 0) {
        res.status(200).json({ success: true, data });
      } else {
        res.status(200).json({
          success: true,
          message: "No notes yet.",
        });
      }
    }
  });
});

app.get("/guestDashboard/:note_id", (req, res) => {
  const note_id = req.params.note_id;
  console.log("Received notes_id:", note_id);

  conn.query(
    "SELECT n.*, uc.user_name FROM notes n JOIN user_credentials uc ON n.user_id = uc.user_id WHERE n.notes_id = ?",
    [note_id],
    (error, data) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (data.length === 0) {
          res.status(404).json({ error: "Note not found" });
        } else {
          res.setHeader("Content-Type", "application/json");
          const note = data[0]; // Assuming there is only one matching note
          res.json(note);
        }
      }
    }
  );
});

app.get("/viewProfile/:username", (req, res) => {
  const username = req.params.username;
  conn.query(
    "SELECT * FROM user_credentials WHERE user_name = ?",
    [username],
    (error, result) => {
      if (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({
          success: false,
          error: "unexpected_error",
          message: "Error fetching user details",
        });
      } else {
        console.log("Query result:", result); // Log the query result

        if (result.length > 0) {
          const userDetails = {
            user_id: result[0].user_id,
            user_name: result[0].user_name,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            email: result[0].email,
            user_type: result[0].user_type,
          };
          console.log("User details:", userDetails);
          res.status(200).json({
            success: true,
            user: userDetails,
          });
        } else {
          console.log("User not found for username:", username);
          res.status(404).json({
            success: false,
            error: "user_not_found",
            message: "User not found",
          });
        }
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
    `SELECT
      f.folder_id,
      f.user_id,
      f.folder_name,
      f.description,
      f.favorited,
      COUNT(n.notes_id) AS notesCount,
      f.created_at,
      f.modified_at
    FROM
      folders f
    LEFT JOIN
      notes n ON f.folder_id = n.folder_id
    WHERE
      f.user_id = ?
    GROUP BY
      f.folder_id`,
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
          res.status(200).json({
            success: true,
            message: "User has no folders yet",
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
        res.status(500).json({ error: "unexpected_error", message: error.message });
      } else {
        res.status(201).json({ success: true, message: "Folder added successfully" });
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
    "DELETE FROM notes where folder_id = ?",
    [folderId],
    (deleteNoteError, deleteNoteData) => {
      if (deleteNoteError) {
        console.error(deleteNoteError);
        res
          .status(500)
          .json({ error: "unexpected_error", message: deleteNoteError.message });
      } else {
        conn.query(
          "DELETE from folders WHERE user_id = ? AND folder_id = ?",
          [userId, folderId],
          (deleteFolderError, deleteFolderData)=>
          {
            if (deleteFolderError) {
              console.error(deleteFolderError);
              res.status(500).json({
                error: "unexpected_error",
                message: deleteFolderError.message,
              });
            } else {
              res.status(200).json({
                success: true,
                message: "Folder and associated notes deleted successfully",
              });
          }})
      }
    }
  );
});

app.get("/:user_id/:folder_name", (req, res) => {
  const folder_name = req.params.folder_name;
  const user_id = req.params.user_id;
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

app.post("/createGuest", (req, res) => {
  const guestId = generateUniqueId(); // Replace with your actual logic for generating IDs
  conn.query(
    "INSERT INTO guests (guest_id) VALUES (?)",
    ['guest_' + guestId],
    (error, result) => {
      if (error) {
        console.error("Error creating guest user:", error);
        res.status(500).json({
          success: false,
          error: "unexpected_error",
          message: "Error creating guest user",
        });
      } else {
        console.log("Guest user created successfully");
        res.status(200).json({
          success: true,
          message: "Guest user created successfully",
        });
      }
    }
  );
});

app.post("/logVisitedDocument", (req, res) => {
  const { person_id, note_id } = req.body;
  console.log("Received request:", person_id, note_id);

  if (!person_id || !note_id) {
    return res.status(400).json({ error: "Bad Request" });
  }

  // Insert a record into the visited_documents table
  const sql = "INSERT INTO visited_documents (person_id, note_id) VALUES (?, ?)";
  const values = [person_id, note_id];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Record inserted successfully");
    return res.status(200).json({ message: "Visited document logged successfully" });
  });
});
