const express = require('express');
const path = require('path');
const cors = require('cors'); 
const config = require('./config');

const app = express();



app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(express.json());
app.use(cors());
app.use(express.static('./dist/com-project'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: '/dist/com-project/'});
});

app.listen(process.env.PORT || "3000");