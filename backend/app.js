const express = require('express');
const path = require('path');
const cors = require('cors'); 
// const mongoose = require('mongoose');
const config = require('./config');

const app = express();
// const { db: { URL } } = config;




app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/dist/com-project'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/com-project/index.html'));
});


module.exports = app;
