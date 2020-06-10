var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

// reference to location of route file
const route = require('./route/routes.js');


// Check the mongod terminal for port number
mongoose.connect('mongodb://localhost:27017/shoppinglist');

mongoose.connection.on('connected', () =>{
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error',(err)=> {
    console.log(err);
});

// Define a port that app runs on (server side)
const PORT = 3000;
// Allows exchange between port 3000 (server side) and clientside
app.use(cors());
// Allows to use JSON
app.use(bodyparser.json());
// Specifies that anything that has /api will be diverted to route file
app.use('/api', route);

app.get('/',(req, res)=>{
    res.send("Roger am here");
});

app.listen(PORT, ()=>{
    console.log("Server started at port:"+PORT);
});