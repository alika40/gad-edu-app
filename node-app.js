const express = require('express');

const coursesRouter = require('./backend/routes/course');
const cors = require('./backend/middleware/cors-config'); 
// const path = require('path');


const app = express();



app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(express.json());
app.use(cors.permission)
app.use(express.static(__dirname + '/dist/'));
app.use(coursesRouter);



module.exports = app;
