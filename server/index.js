const express = require('express');
const bodyParser = require('body-parser');

const User = require('../database-mongodb/User.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

//login request
app.post('/api/cv/login', function (req, res) {
  console.log("data from req:",req.body);
  User.find(req.body,(error, data) => {
    if (error) {
      throw error
    }
    else {
      console.log("data from db:", data);
      res.send(data)
    }
  })
});
///signup request

app.post('/api/cv', function (req, res) {
  console.log("data from req:", req.body);
  User.create(req.body,(error) => {
    if (error) {
      throw error
    }
    
  })
});
//load data of user while trying to fill the cv from previous edit
app.post('/api/cv/create', function (req, res) {
  // console.log("data from req:",req.body);
  User.find(req.body,(error, data) => {
    if (error) {
      throw error
    }
    else {
      // console.log("data from db:", data);
      res.send(data)
    }
  })
});
//save the changement of cv in db
app.put('/api/cv/save/:_id', function (req, res) {
   console.log("req in server in save",req.body);
  // console.log('id from storage:',req.params);
  User.updateOne({_id:req.params},req.body,(error, data) => {
    if (error) {
      throw error
    }
    else {
       console.log("data from db:", data);
      res.send(data)
    }
  })
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
