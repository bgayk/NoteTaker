const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const middleware = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;


const app = express();

app.use(middleware.clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))  
);

// Wildcard route to direct users to the index.html per specs
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
