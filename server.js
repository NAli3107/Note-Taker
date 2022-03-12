/* Importing express modules */
const express = require('express');
const fs = require('fs');
const htmlRoutes = require("./routes/htmlRoutes")
const apiRoutes = require("./routes/api")
const uuid = require("uuid");

const PORT = process.env.PORT || 3001; 

const app = express(); 

/* Middleware for parsing JSON and urlencoded form data. */

app.use(express.json());
app.use(express.urlencoded ({ extended: true }));
app.use(express.static('public')); 

/* Listening to app in PORT*/
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

