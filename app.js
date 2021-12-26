const express = require('express');
const path = require('path');

// const coursesRouter = require('/backend/routes/course');
// const cors = require('/backend/middleware/cors-config'); 
const cors = require(path.join(__dirname + '/backend/middleware/cors-config'));
const coursesRouter = require(path.join(__dirname + '/backend/routes/course'));


const app = express();



app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(express.json());
app.use(cors.permission)
app.use(coursesRouter);
app.use(express.static(__dirname + '/dist/com-project'));
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/dist/com-project/index.html'));
});




module.exports = app;
