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
  // console.log(`${firstName} ${lastName} signed up with ${email}.`);

  var data = {
    members: [
      {
        email_address: email,
        email_type: "text",
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/5546c7d84e",
    method: "POST",
    headers: {
      "Authorization": "rubengmano 428a6341366d09f03b722520a978bc5c-us5"
    },
    body: jsonData

  };

  request(options, (error, response, body) => {
    if(error){
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

// post request for the failure rooute
app.post("/failure", (req, res) => {
  res.redirect("/");
});

// set up the app to listen on the right port
app.listen(port, () => console.log(`Server is listening on port ${port}`));

// Mail Chimp api key: 428a6341366d09f03b722520a978bc5c-us5
// list id: 5546c7d84e
