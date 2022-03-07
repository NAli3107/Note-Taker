/* Importing express modulea */
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3001; 

const app = express(); 

/* Middleware for parsing JSON and urlencoded form data. */

app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(express.static('public')); 

/* Requesting data. */
const { notes } = require('./db');

const generateNewNotes = function (body, notesArr) {
    const note = body;
    notesArr.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db.json'),
        JSON.stringify({ notes : notesArr }, null, 2)
    );
    return note;
};

/* validating data */
function validateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false; 
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;   
};

/* Route GET method */
app.get('/api/notes', (req, res) => {
    res.json(notes); 
});

/* Route POST method to store data server-side. */
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.'); 
    
    } else {
        // add note to json file and animals array in this function 
        const note = generateNewNotes(req.body, notes); 

        res.json(note);
    }
}); 

/* Delete method to remove notes. */
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;

    notes.map((element, index) => {
      if (element.id == id){
        note = element
        notes.splice(index, 1)
        return res.json(note);
      } 
    
    })
});

/* Route to index.html */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
}); 

/* Route to notes.html */
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/notes.html'));
}); 


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

