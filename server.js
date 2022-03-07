/* Importing express modulea */
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001; 

const app = express(); 

/* Middleware for parsing JSON and urlencoded form data. */

app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(express.static('public')); 

/* Requesting data. */
const { notes } = require('./db.json');

const generateNewNotes = function (body, notesArr) {
    const note = body;
    notesArr.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db.json'),
        JSON.stringify({ notes : notesArr }, null, 2)
    );
    return note;
};


/* Route GET method */
app.get('/api/notes', (req, res) => {
    res.json(notes); 
});

/* Route POST method to store data server-side. */
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    
        const note = generateNewNotes(req.body, notes); 

        res.json(note);
    
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

