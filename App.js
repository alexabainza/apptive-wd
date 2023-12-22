const express = require("express");
const app = express();
const port = 3000;
// const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: generateUniqueId } = require("uuid"); // Add this line
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const { verify, sign } = require("jsonwebtoken");
const mysql = require('mysql2'); // Note the '/promise' at the end
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apptive",
});

const generateToken = (user_id, username) => {
  return jwt.sign({ user_id, username}, "jwtSecret", {
    expiresIn: 60 * 60 * 24 * 30 * 1000, // Set the expiration time as needed
  });
};

const verifyJWT = (req, res, next) => {
  //authorize if the user is allowed
  const token = req.headers['authorization'];
  if (!token) 
    return res.status(400).json({ error: 'User not authenticated' });

  try {
    const validToken = jwt.verify(token, 'jwtSecret');
    req.authenticated = true;
    req.user = validToken;  // Set the decoded token in req.user
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Token invalid' });
  }
};

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
const isUsernameTaken = async (username) => {
  const [existingUser] = await conn
    .promise()
    .query("SELECT * FROM user_credentials WHERE user_name = ?", [username]);
  return existingUser.length > 0;
};

// Function to check if an email is already in use
const isEmailTaken = async (email) => {
  const [existingEmail] = await conn
    .promise()
    .query("SELECT * FROM user_credentials WHERE email = ?", [email]);
  return existingEmail.length > 0;
};

// Function to generate a JWT token

app.post("/register", async (req, res) => {
  const { id, username, password, firstname, lastname, email } = req.body;

  try {
    // Check if the username already exists
    const isUsernameExist = await isUsernameTaken(username);
    if (isUsernameExist) {
      return res.status(400).json({
        message: "Username already exists.",
        field: "username",
      });
    }

    // Check if the email is already in use
    const isEmailExist = await isEmailTaken(email);
    if (isEmailExist) {
      return res.status(400).json({
        message: "Email already linked to another account.",
        field: "email",
      });
    }

    // If username and email are not taken, proceed with user registration
    const hashedPassword = await bcrypt.hash(password, 10);
    await conn
      .promise()
      .query(
        "INSERT INTO user_credentials (`user_id`, `user_name`, `firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?)",
        [id, username, firstname, lastname, email, hashedPassword]
      );

    // Generate a new token for the registered user
    const token = generateToken(id, username);

    return res.status(201).json({
      message: "User registered successfully",
      token: token,
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
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error: "unexpected_error",
          message: error.message,
        });
      }
      if (data.length > 0) {
        const storedPassword = data[0].password;

        const isMatch = await bcrypt.compare(password, storedPassword);

        if (isMatch) {
          const user_id = data[0].user_id;
          const token = generateToken(user_id, username)
          
          res.json({
            auth: true,
            token: token,
            result: {
              user_id: data[0].user_id,
              username: data[0].user_name,
            },
          });
        } else {
          console.log("Incorrect Password:", password);
          res.json({ auth: false, message: "wrong username/password" });
        }
      } else {
        res.json({ auth: false, message: "no user exists" });
        // res.status(404).json({ success: false, message: "User not found" });
      }
    }
  );
});

app.get("/isUserAuthenticated", (req, res) => {
  res.send({message: "you are valid"});
});

app.get("/community-notes", verifyJWT, (req, res) => {
  const person_id = req.user.user_id;
  conn.query(
    "SELECT n.*, uc.user_name AS user_name, f.folder_name AS folder_name FROM notes n JOIN user_credentials uc ON n.user_id = uc.user_id JOIN folders f ON n.folder_id = f.folder_id WHERE n.isPublic = 1",
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Unexpected error",
        });
      } else {

        if (data.length > 0) {
          res.status(200).json({ success: true, data });
        } else {
          res.status(200).json({
            success: true,
            person_id: person_id, // Include the person_id in the response

            message: "No notes yet.",
          });
        }
      }
    }
  );
});


app.get("/guest/community-notes", (req, res) => {
  const guestId = req.headers['guest-id'];  // Assuming guestId is sent in the headers
  if (!guestId) {
    return res.status(401).json({
      success: false,
      message: 'Guest not authenticated. Please provide guestId.',
    });
  }  conn.query(
    "SELECT n.*, uc.user_name AS user_name, f.folder_name AS folder_name FROM notes n JOIN user_credentials uc ON n.user_id = uc.user_id JOIN folders f ON n.folder_id = f.folder_id WHERE n.isPublic = 1",
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Unexpected error",
        });
      } else {

        if (data.length > 0) {
          res.status(200).json({ success: true, data });
        } else {
          res.status(200).json({
            success: true,
            guestId: guestId, // Include the guestId in the response
            message: "No notes yet.",
          });
        }
      }
    }
  );
});
// app.patch("/:folder_name/:note_id/updateIsPublic", verifyJWT, async (req, res) => {
//     const userId = req.user.user_id;

//     const { folder_name, note_id } = req.params;
//     const { isPublic } = req.body;

//     const [folderResults] = await conn.query(
//         "SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = ?",
//         [userId, folder_name]
//       );

//       console.log("Folder Results:", folderResults);
  
// });




app.get("/guest/community-notes/:note_id", (req, res) => {
  const note_id = req.params.note_id;
  const guestId = req.headers['guest-id'];  // Assuming guestId is sent in the headers

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
app.get("/community-notes/:note_id", verifyJWT, (req, res) => {
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
app.get("/profile", verifyJWT, (req, res) => {
  // The user information is available in req.user after the verifyJWT middleware
  const { user_id } = req.user;

  conn.query(
    "SELECT * FROM user_credentials WHERE user_id = ?",
    [user_id],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "unexpected_error", message: error.message });
      } else {
        if (data.length > 0) {
          const user = {
            user_id: data[0].user_id,
            username: data[0].user_name,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            email: data[0].email,
          };
          res.status(200).json({ success: true, user });
        } else {
          res.status(404).json({ success: false, message: "User not found" });
        }
      }
    }
  );
});

app.get("/check-user-type", verifyJWT, (req, res) => {
  const { user_id } = req.user;

  conn.query(
    "SELECT * FROM guests WHERE guest_id = ?",
    [user_id],
    (error, resultGuests) => {
      if (error) {
        console.error("Error executing guests query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      console.log("Guests Query Result:", resultGuests);

      if (resultGuests.length > 0) {
        // User is a guest
        res.json({ success: true, userType: "guest", data: resultGuests });
      } else {
        conn.query(
          "SELECT user_type FROM user_credentials WHERE user_id = ?",
          [user_id],
          (error, resultCredentials) => {
            if (error) {
              console.error("Error executing user_credentials query:", error);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }

            console.log("Credentials Query Result:", resultCredentials);

            if (resultCredentials.length > 0) {
              // User is registered
              res.json({ success: true, userType: "registered", data: resultCredentials });
            } else {
              // User is invalid
              res.json({ success: true, userType: "invalid", data: null });
            }
          }
        );
      }
    }
  );
});
app.get('/dashboard', verifyJWT, async (req, res) => {
  const userId = req.user.user_id;

  try {
    const [userData] = await conn.promise().query(
      `SELECT
        u.user_name,
        f.folder_id,
        f.user_id,
        f.folder_name,
        f.description,
        f.favorited,
        COUNT(n.notes_id) AS notesCount,
        f.created_at,
        f.modified_at
      FROM
        user_credentials u
      LEFT JOIN
        folders f ON u.user_id = f.user_id
      LEFT JOIN
        notes n ON f.folder_id = n.folder_id
      WHERE
        u.user_id = ?
      GROUP BY
        f.folder_id`,
      [userId]
    );

    if (!userData || userData.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'unexpected_error', message: error.message });
  }
});

app.post("/logout", (req, res) => {
  // You may want to do additional cleanup or logging here
  res.json({ success: true, message: "Logout successful" });
});

app.post("/dashboard/addFolder", verifyJWT, (req, res) => {
  const userId = req.user.user_id;
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
app.patch("/dashboard/updateFolder/:folder_id", verifyJWT, (req, res) => {
  const userId = req.user.user_id;
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

app.delete("/dashboard/deleteFolder/:folder_id", verifyJWT, (req, res) => {
  const folderId = req.params.folder_id;
  const userId = req.user.user_id;

  conn.query(
    "DELETE FROM notes where folder_id = ?",
    [folderId],
    (deleteNoteError, deleteNoteData) => {
      if (deleteNoteError) {
        console.error(deleteNoteError);
        res
          .status(500)
          .json({
            error: "unexpected_error",
            message: deleteNoteError.message,
          });
      } else {
        conn.query(
          "DELETE from folders WHERE user_id = ? AND folder_id = ?",
          [userId, folderId],
          (deleteFolderError, deleteFolderData) => {
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
            }
          }
        );
      }
    }
  );
});
app.get("/:folder_name", verifyJWT, (req, res) => {
  const folder_name = req.params.folder_name;
  const user_id = req.user.user_id;

  // Use LEFT JOIN to include users with no notes
  conn.query(
    "SELECT f.folder_name, n.*, u.user_name FROM folders f " +
    "LEFT JOIN notes n ON f.folder_id = n.folder_id AND n.user_id = ? " +
    "LEFT JOIN user_credentials u ON u.user_id = ? " +
    "WHERE f.user_id = ? AND f.folder_name = ?",
    [user_id, user_id, user_id, folder_name],
    (error, data) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(data);
      }
    }
  );
});


app.get("/:folder_name/:notes_id",verifyJWT, (req, res) => {
  const folder_name = req.params.folder_name;
  const user_id = req.user.user_id;
  const note_id = req.params.notes_id;
  conn.query(
    "SELECT n.*, u.user_name FROM notes n " +
    "INNER JOIN folders f ON f.folder_id = n.folder_id " +
    "LEFT JOIN user_credentials u ON u.user_id = n.user_id " +
    "WHERE n.user_id = ? AND f.user_id = ? AND f.folder_name = ? AND n.notes_id = ?",
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
app.get("/user/:userId", verifyJWT, (req, res) => {
  const userId = req.params.userId;

  conn.query(
    "SELECT user_name FROM user_credentials WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          error: "unexpected_error",
          message: "Internal Server Error",
        });
      }

      if (result.length > 0) {
        const user = result[0];
        res.json({ user_id: userId, user_name: user.user_name });
      } else {
        res.status(404).json({
          error: "user_not_found",
          message: "User not found",
        });
      }
    }
  );
});
app.post("/:folder_name/addNote", verifyJWT, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const folderName = req.params.folder_name;

    const note_id = `${userId}_${uuidv4()}_${uuidv4()}`;

    const result = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT f.folder_id, u.user_name FROM folders f " +
        "LEFT JOIN user_credentials u ON u.user_id = f.user_id " +
        "WHERE f.user_id = ? AND f.folder_name = ?",
        [userId, folderName],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (result.length > 0) {
      const folderId = result[0].folder_id;
      const username = result[0].user_name; // Extract username from the result

      console.log("user name from app js is " + username);

      // Send the username back to the frontend immediately
      res.status(200).json({
        success: true,
        message: "Username retrieved successfully",
        username: username,
      });

      // Insert the note in the background
      conn.query(
        "INSERT INTO notes(user_id, folder_id, notes_id, note_title, contents) VALUES (?, ?, ?, ?, ?)",
        [userId, folderId, note_id, req.body.noteTitle, req.body.contents],
        (error, data) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Note added successfully");
          }
        }
      );
    } else {
      res
        .status(404)
        .json({ error: "folder_not_found", message: "Folder not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "unexpected_error", message: error.message });
  }
});

app.delete("/:folder_name/delete/:note_id", verifyJWT, (req, res) => {
  const userId = req.user.user_id;
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
                res.status(201).json({
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
app.patch("/:folder_name/:note_id/updateNote", verifyJWT, (req, res) => {
  const userId = req.user.user_id;
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
                  .json({
                    error: "unexpected_error",
                    message: updateError.message,
                  });
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
  console.log("Create guest path called");

  conn.query(
    "INSERT INTO guests (guest_id) VALUES (?)",
    [guestId],
    (error, result) => {
      if (error) {
        console.error("Error creating guest user:", error);
        res.status(500).json({
          success: false,
          error: "unexpected_error",
          message: "Error creating guest user",
        });
      } else {
        console.log(`Guest user created successfully: ${guestId}`);
        res.status(200).json({
          success: true,
          message: "Guest user created successfully",
          guestId: guestId, // Include the guestId in the response
        });
      }
    }
  );
});
app.post("/logVisitedDocument", async (req, res) => {
  const { person_id, note_id } = req.body;

  try {
    // Check if the document has already been viewed
    const [viewedDocument] = await conn
      .promise()
      .query(
        "SELECT * FROM visited_documents WHERE person_id = ? AND note_id = ?",
        [person_id, note_id]
      );

    if (viewedDocument.length > 0) {
      console.log("Document has already been viewed. Skipping logging.");
      return res.status(200).json({ message: "Document already viewed" });
    }

    // Insert a record into the visited_documents table
    await conn
      .promise()
      .query("INSERT INTO visited_documents (person_id, note_id) VALUES (?, ?)", [person_id, note_id]);

    console.log("Record inserted successfully");

    return res
      .status(200)
      .json({ message: "Visited document logged successfully" });
  } catch (err) {
    console.error("Error logging visited document:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/:folder_name/:note_id/makeFlashcards", verifyJWT, (req, res)=>{
  const { folder_id, flashcard_set_id, user_id, question, answer } = req.body;
  const { folder_name, note_id } = req.params;
  const randomId = uuidv4();
  const flashcard_id = `${note_id}_${randomId}`;
  try {

  conn.query('INSERT INTO flashcards (flashcard_id, flashcard_set_id, user_id, question, answer) VALUES (?, ?, ?, ?, ?)', [flashcard_id, flashcard_set_id, user_id, question, answer]);
  res.status(201).json({ flashcard_id });
  }
  catch (error) {
    console.error('Error generating flashcard:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

})

app.get("/:folder_name/:note_id/flashcards", verifyJWT, (req, res)=>{
  const {folder_name, note_id} = req.params
  conn.query(
    "SELECT * FROM flashcards WHERE flashcard_set_id = ?", [note_id],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Unexpected error",
        });
      } else {

        if (data.length > 0) {
          res.status(200).json({ success: true, data });
        } else {
          res.status(200).json({
            success: true,
            // person_id: person_id, // Include the person_id in the response
            message: "No flashcards yet.",
          });
        }
      }
    }
  );
})

app.delete("/:folder_name/:note_id/flashcards/:flashcardId/delete", verifyJWT, (req, res) =>{
  const {folder_name, note_id, flashcardId} = req.params
  conn.query(
    "DELETE FROM flashcards WHERE flashcard_id = ?", [flashcardId],
    (error, data) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
      } else {
        res.status(201).json({
          success: true,
          message: "Note deleted successfully",
        });
      }})}
  )

  app.patch('/:folder_name/:note_id/flashcards/:flashcard_id/edit', (req, res) => {
    const { folder_name, note_id, flashcard_id } = req.params;
    const { question, answer } = req.body;
  
    conn.query("UPDATE flashcards SET question = ?, answer = ?,  modified_at = NOW() WHERE flashcard_id = ?",
    [question, answer, flashcard_id],
    
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
            message: "Flashcard updated successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Folder not found",
          });
        }
      }
    })
    });
