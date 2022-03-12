const express = require("express")
const router = express.Router()
const fs = require("fs")
const uuid = require("uuid");

/* Get function  */
router.get("/api/notes", (req, res) => {
    fs.readFile("../db/db.json","utf-8",(err,data)=>{
        if (err){
            console.log(err) 
        } else{
            return res.json(JSON.parse(data))
        }
    })
});

/* Post function to add new notes */
router.post("/api/notes", (req, res) => {
    const note = JSON.parse(fs.readFileSync("../db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();
    note.push(newNote);
    fs.writeFileSync("../db/db.json", JSON.stringify(note))
    res.json(note);
});

/* Delete method to remove notes.*/
router.delete("/api/notes/:id", (req, res) => {
    const note = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = note.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("../db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
})

module.exports = router