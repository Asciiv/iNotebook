const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Create a user using: POST "/api/auth/" . Doesn't require Auth
// Route 1 : Gat all the notes using get request. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});
//Route 2 : Add a new Note using: POST "/api/auth/addNote". login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors , return bad requests and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);
// Route 3: Update an existing note with

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to updated if update req.
    //const note = Notes.findByIdAndUpdate(req.params.id)
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //if user is same or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }

  //Create a newNote object
});
// Route 4 : Deleting a note using delete
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }

  // Find the note to be delete and delete it as req.
  //const note = Notes.findByIdAndUpdate(req.params.id)
});

module.exports = router;
