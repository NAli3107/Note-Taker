const express = require("express")
const router = express.Router()
const path = require("path")

/* Route to call html homepage */

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});
//call for notes.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
