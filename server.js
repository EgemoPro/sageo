const express = require("express");
const server = express();
const routes = require("./routes/server.routes");
const cors = require('cors');
const path = require('path')
require('dotenv').config()

const port = process.env.PORT;

// Indiquer l'emplacement du dossier views

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'static')));

server.use(cors({
  origin:'http://localhost:3000/',
  methods:'POST'
}));


// Routes de login
server.use("/", routes);


server.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/formulaire/index.html')
})
server.listen(port, () => console.log("Server started")); 
