const express = require('express');

const coursesRouter = require('/backend/routes/course');
const cors = require('/backend/middleware/cors-config');



const app = (app) => {

    app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
    app.use(express.json());
    app.use(cors.permission)
    app.use(coursesRouter);

}



module.exports = app;
