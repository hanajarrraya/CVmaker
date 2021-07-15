const express = require('express');
const bodyParser = require('body-parser');

const Users = require('../database-mongodb/User.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/api/cv', function (req, res) {
  Users.find({_id:req.body},(error, data) => {
    if (error) {
      throw error
    }
    else {
      // console.log("data from db:", data);
      res.send(data)
    }
  })
});

app.post('/api/cv', function (req, res) {
  console.log("data from req:", req.body);
  Users.create(req.body,(error) => {
    if (error) {
      throw error
    }
    
  })
});
app.put('/api/cv/:userId', function (req, res) {
  console.log("req in server",req.body);
  Users.updateOne({_id:req.params.userId},req.body,(error, data) => {
    if (error) {
      throw error
    }
    else {
      // console.log("data from db:", data);
      res.send(data)
    }
  })
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
