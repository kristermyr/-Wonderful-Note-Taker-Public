
//requires
const { Router } = require('express');      
const express = require('express');
const fs = require('fs');                  
const { Server } = require('http');
const path = require ('path');
const notes = require('./db/db.json');

//sets port
const PORT = process.env.PORT || 3001
const app = express();

// parse incoming JSON
app.use(express.json());
// use express static on public folder
app.use(express.static('public'));
app.use(express.urlencoded({extended: true }));

//will serve upp the 'public/notes.html page

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
//will serve upp the ./public/index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// `GET *` should return the `index.html` file.
app.get('*'),(req, res) =>
res.sendFile(path.join(__dirname,'index.html'));

app.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      return res.json(notes)
    })
  });

// Post route for when notes gets created in HTML.

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    let response;
    let noteId = notes.length +1  //code to create unique Id for each note
    if (req.body) {
        response = {             
          title: req.body.title,
      text: req.body.text,
      id: noteId
        };
        res.status(201).json(response);
      } else {
        res.status(400).json('Request body must at least contain a note name');
      }
   
       notes.push(response);
      
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    
  
    
});

app.delete("/api/notes/:id", function (req, res) {          // deletes created note
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
    
    })
  })
})
 //read the `db.json` file and return all saved notes as JSON.
    app.get('/api/db', (req,res) => res.json(notes)); 
    app.get('/api/', (req,res) => res.json(notes));
    app.get('/notes', (req,res) => res.json(notes));


    // listener
    app.listen(PORT, () =>
    console.log(`App is listening at http://localhost:${PORT}`)
    );

   

  