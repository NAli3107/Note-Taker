const express = require("express")
const router = express.Router()
const fs = require("fs")
const uuid = require("uuid");

/* Get function to add routes */
router.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json","utf-8",(err,data)=>{
        if (err){
            console.log(err) 
        } else{
            return res.json(JSON.parse(data))
        }
    })
});

/* Post function to add new notes */
router.post("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

/* Delete method to remove notes.*/
router.delete("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

module.exports = router