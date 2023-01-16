const express = require('express');
const fs = require('fs');;
const path = require ('path');
const notes = require('./db/db.json')
const PORT = 3001;
const app = express();

app.use(express.static('public'));

//creates a route that will serve upp the 'public/notes.html page

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// `GET *` should return the `index.html` file.
app.get('*'),(req, res) =>
res.sendFile(path.join(__dirname,'index.html'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Post route for when notes gets created in HTML

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    writeToFile(destination, newNote)
 
    res.json(`${req.method} received`);
});



 //read the `db.json` file and return all saved notes as JSON
    app.get('/api/db', (req,res) => res.json(notes)); 
    app.get('/api/', (req,res) => res.json(notes));

    app.listen(PORT, () =>
    console.log(`App is listening at http://localhost:${PORT}`)
    );

   

  