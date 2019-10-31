// jshint esversion:6

// Require the installed modules
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Setup the port
const port = 3000;

// Create the express app
const app = express();

//body parser to be able to read
app.use(bodyParser.urlencoded({extended: true}));

// Give access to static files such as images and css stylesheet
app.use(express.static("public"));

// Set the body parser to be abled to read
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => res.sendFile(__dirname + "/signup.html"));

app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  console.log(`${firstName} ${lastName} signed up with ${email}.`);
});

// set up the app to listen on the right port
app.listen(port, () => console.log(`Server is listening on port ${port}`));
