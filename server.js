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