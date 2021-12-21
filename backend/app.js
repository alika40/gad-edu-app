const express = require('express');

const coursesRouter = require('./routes/course');
const cors = require('./middleware/cors-config'); 


const app = express();



app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(express.json());
app.use(cors.permission)
app.use(coursesRouter);



module.exports = app;
