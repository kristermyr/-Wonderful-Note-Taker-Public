const { Router } = require('express');
const express = require('express');
const fs = require('fs');
const path = require ('path');
const notes = require('./db/db.json');
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true }));

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

// Post route for when notes gets created in HTML.

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    let response;
    let id = notes.length +1
    if (req.body) {
        response = {
          title: req.body.title,
      text: req.body.text,
      id: id
        };
        res.status(201).json(response);
      } else {
        res.status(400).json('Request body must at least contain a note name');
      }
      console.log(req.body);
      console.log(notes)
       notes.push(response);
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json(notes);
    app.delete('/api/notes/:id', (req, res) => {
        deleteNote(req.params.id, notes);
        res.json(true);
    });
});

 //read the `db.json` file and return all saved notes as JSON.
    app.get('/api/db', (req,res) => res.json(notes)); 
    app.get('/api/', (req,res) => res.json(notes));
    app.get('/notes', (req,res) => res.json(notes));

    app.listen(PORT, () =>
    console.log(`App is listening at http://localhost:${PORT}`)
    );

   

  