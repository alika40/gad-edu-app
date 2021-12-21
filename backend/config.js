require("dotenv").config();


const config = {
    app: {
        APP_BASE_URL: process.env.APP_BASE_URL,
        API_URL: process.env.API_URL,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
    },
   };


module.exports = config;
