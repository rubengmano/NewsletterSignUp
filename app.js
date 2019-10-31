// jshint esversion:6

// Require the installed modules
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Setup the port
const port = 3000;

// Create the express app
const app = express();

// Set the body parser to be abled to read
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => res.sendFile(__dirname + "/signup.html"));

// set up the app to listen on the right port
app.listen(port, () => console.log(`Server is listening on port ${port}`));
