const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mysql = require("mysql2");

const { v4: uuidv4 } = require("uuid");
const { v4: generateUniqueId } = require("uuid");

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
  return jwt.sign({ user_id, username }, "jwtSecret", {
    expiresIn: 60 * 60 * 24 * 30 * 1000,
  });
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(400).json({ error: "User not authenticated" });

  try {
    const validToken = jwt.verify(token, "jwtSecret");
    req.authenticated = true;
    req.user = validToken;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Token invalid" });
  }
};

app.get("/", (req, res) => {
  res.send("Hello world");
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

const isEmailTaken = async (email) => {
  const [existingEmail] = await conn
    .promise()
    .query("SELECT * FROM user_credentials WHERE email = ?", [email]);
  return existingEmail.length > 0;
};

app.post("/register", async (req, res) => {
  const { id, username, password, firstname, lastname, email } = req.body;

  try {
    const isUsernameExist = await isUsernameTaken(username);
    if (isUsernameExist) {
      return res.status(400).json({
        message: "Username already exists.",
        field: "username",
      });
    }

    const isEmailExist = await isEmailTaken(email);
    if (isEmailExist) {
      return res.status(400).json({
        message: "Email already linked to another account.",
        field: "email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await conn
      .promise()
      .query(
        "INSERT INTO user_credentials (`user_id`, `user_name`, `firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?)",
        [id, username, firstname, lastname, email, hashedPassword]
      );

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
          const token = generateToken(user_id, username);

          res.json({
            auth: true,
            token: token,
            result: {
              user_id: data[0].user_id,
              username: data[0].user_name,
            },
          });
        } else {
          res.json({ auth: false, message: "wrong username/password" });
        }
      } else {
        res.json({ auth: false, message: "no user exists" });
      }
    }
  );
});

app.get("/isUserAuthenticated", (req, res) => {
  res.send({ message: "you are valid" });
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
            person_id: person_id,

            message: "No notes yet.",
          });
        }
      }
    }
  );
});

app.get("/guest/community-notes", (req, res) => {
  const guestId = req.headers["guest-id"];
  if (!guestId) {
    return res.status(401).json({
      success: false,
      message: "Guest not authenticated. Please provide guestId.",
    });
  }
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
            guestId: guestId,
            message: "No notes yet.",
          });
        }
      }
    }
  );
});


app.get("/guest/community-notes/:note_id", (req, res) => {
  const note_id = req.params.note_id;
  const guestId = req.headers["guest-id"];

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
          const note = data[0];
          res.json(note);
        }
      }
    }
  );
});
app.get("/community-notes/:note_id", verifyJWT, (req, res) => {
  const note_id = req.params.note_id;

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
          const note = data[0];
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
        if (result.length > 0) {
          const userDetails = {
            user_id: result[0].user_id,
            user_name: result[0].user_name,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            email: result[0].email,
            user_type: result[0].user_type,
          };
          res.status(200).json({
            success: true,
            user: userDetails,
          });
        } else {
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
  const { user_id } = req.user;

  conn.query(
    "SELECT * FROM user_credentials WHERE user_id = ?",
    [user_id],
    (error, data) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "unexpected_error", message: error.message });
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

      if (resultGuests.length > 0) {
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

            if (resultCredentials.length > 0) {
              res.json({
                success: true,
                userType: "registered",
                data: resultCredentials,
              });
            } else {
              res.json({ success: true, userType: "invalid", data: null });
            }
          }
        );
      }
    }
  );
});
app.get("/dashboard", verifyJWT, async (req, res) => {
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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        error: "unexpected_error",
        message: error.message,
      });
  }
});

app.post("/logout", (req, res) => {
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
app.patch("/edit-profile", verifyJWT, (req, res) => {
  const { firstname, lastname } = req.body;
  const userId = req.user.user_id;

  conn.query(
    "UPDATE user_credentials SET firstname = ?, lastname = ? WHERE user_id = ?",
    [firstname, lastname, userId],
    (error, updateResult) => {
      if (error) {
        console.error("Error editing profile:", error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (updateResult.affectedRows > 0) {
        return res.json({
          success: true,
          message: "Profile updated successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
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
        res.status(500).json({
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

app.patch(
  "/:folder_name/:note_id/togglePublicPrivate",
  verifyJWT,
  async (req, res) => {
    const { folder_name, note_id } = req.params;
    const { isPublic } = req.body;

    try {
      conn.query("UPDATE notes SET isPublic = ? WHERE notes_id = ?", [
        isPublic,
        note_id,
      ]);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error toggling public/private status:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

app.get("/:folder_name/:notes_id", verifyJWT, (req, res) => {
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
          const note = data[0];
          res.json(note);
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
      const username = result[0].user_name;

      res.status(200).json({
        success: true,
        message: "Username retrieved successfully",
        username: username,
      });

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
    res.status(500).json({ error: "unexpected_error", message: error.message });
  }
});

app.delete("/:folder_name/delete/:note_id", verifyJWT, (req, res) => {
  const userId = req.user.user_id;
  const folderName = req.params.folder_name;
  const note_id = req.params.note_id;

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
                res.status(500).json({
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
  const guestId = generateUniqueId();
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
        res.status(200).json({
          success: true,
          message: "Guest user created successfully",
          guestId: guestId,
        });
      }
    }
  );
});

app.post("/logVisitedDocument", async (req, res) => {
  const { person_id, note_id } = req.body;

  try {
    const [viewedDocument] = await conn
      .promise()
      .query(
        "SELECT * FROM visited_documents WHERE person_id = ? AND note_id = ?",
        [person_id, note_id]
      );

    if (viewedDocument.length > 0) {
      return res.status(200).json({ message: "Document already viewed" });
    }

    const [documentCount] = await conn
      .promise()
      .query(
        "SELECT COUNT(*) AS document_count FROM visited_documents WHERE person_id = ?",
        [person_id]
      );

    const { document_count } = documentCount[0];

    if (document_count >= 3) {
      console.error("User has three logged entries in visited_documents.");
      return res.status(403).json({
        error: "document_limit_exceeded",
        documentCount: document_count,
        message: "User has three logged entries in visited_documents.",
      });
    }
    

    const insertSql =
      "INSERT INTO visited_documents (person_id, note_id) VALUES (?, ?)";
    const insertValues = [person_id, note_id];
    await conn.promise().query(insertSql, insertValues);

    return res
      .status(200)
      .json({ message: "Visited document logged successfully" });
  } catch (err) {
    console.error("Error logging visited document:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/checkIfDocumentViewed", async (req, res) => {
  const guestId = req.headers["guest-id"];

  const { person_id, note_id } = req.body;

  if (!person_id || !note_id) {
    return res.status(400).json({ error: "Bad Request" });
  }

  try {
    const [viewedDocument] = await conn
      .promise()
      .query(
        "SELECT * FROM visited_documents WHERE person_id = ? AND note_id = ?",
        [person_id, note_id]
      );

    const viewed = viewedDocument.length > 0;

    const [rows = []] = await conn
      .promise()
      .query(
        "SELECT COUNT(*) as document_count FROM visited_documents WHERE person_id = ?",
        [person_id]
      );

    const documentCount = rows[0].document_count;

    return res.status(200).json({ viewed, document_count: documentCount });
  } catch (err) {
    console.error("Error checking if document viewed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getDocumentCount/:person_id", async (req, res) => {
  const personId = req.params.person_id;

  const guestId = req.headers["guest-id"];

  if (!guestId) {
    return res.status(401).json({
      success: false,
      message: "Guest not authenticated. Please provide guestId.",
    });
  } else {
    try {
      const [rows] = await conn.execute(
        "SELECT COUNT(*) as document_count FROM visited_documents WHERE person_id = ?",
        [personId]
      );

      const documentCount = rows[0].document_count;
      res.json({ document_count: documentCount });
    } catch (error) {
      console.error("Error fetching document count", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.post("/:folder_name/:note_id/makeFlashcards", verifyJWT, (req, res) => {
  const { folder_id, flashcard_set_id, user_id, question, answer } = req.body;
  const { folder_name, note_id } = req.params;
  const randomId = uuidv4();
  const flashcard_id = `${note_id}_${randomId}`;
  try {
    conn.query(
      "INSERT INTO flashcards (flashcard_id, flashcard_set_id, user_id, question, answer) VALUES (?, ?, ?, ?, ?)",
      [flashcard_id, flashcard_set_id, user_id, question, answer]
    );
    res.status(201).json({ flashcard_id });
  } catch (error) {
    console.error("Error generating flashcard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/:folder_name/:note_id/flashcards", verifyJWT, (req, res) => {
  const { folder_name, note_id } = req.params;
  conn.query(
    "SELECT * FROM flashcards WHERE flashcard_set_id = ?",
    [note_id],
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
            message: "No flashcards yet.",
          });
        }
      }
    }
  );
});

app.delete(
  "/:folder_name/:note_id/flashcards/:flashcardId/delete",
  verifyJWT,
  (req, res) => {
    const { folder_name, note_id, flashcardId } = req.params;
    conn.query(
      "DELETE FROM flashcards WHERE flashcard_id = ?",
      [flashcardId],
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
  }
);

app.patch(
  "/:folder_name/:note_id/flashcards/:flashcard_id/edit",
  (req, res) => {
    const { folder_name, note_id, flashcard_id } = req.params;
    const { question, answer } = req.body;

    conn.query(
      "UPDATE flashcards SET question = ?, answer = ?,  modified_at = NOW() WHERE flashcard_id = ?",
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
      }
    );
  }
);
