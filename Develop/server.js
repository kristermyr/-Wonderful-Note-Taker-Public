/*
The following HTML routes should be created:
* `GET /notes` should return the `notes.html` file.

* `GET *` should return the `index.html` file.

The following API routes should be created:

* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

* `POST /api/notes

*/

const fs = require('fs');;
const express = require('express');
const path = require ('path');
const { Server } = require('http');


//get route for static homepage

app.get('/notes'),(req, res) =>
res.sendFile('notes.html');


// Post route for when notes gets created in HTML

app.post('/note/location/temp', (req, res) => {
    const newNote = req.body
    writeToFile(destination, newNote)

    res.json(`${req.method} received`);
});