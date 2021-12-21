const axios = require('axios');
const config = require('../config');


const { app: { API_URL, CLIENT_ID, CLIENT_SECRET } } = config;



const authHeaderValue = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');


module.exports =  axios.create({
            baseURL: API_URL,
            headers: {
                        'content-type': 'text/html; charset=UTF-8',
                        'Authorization': authHeaderValue
                 },
            responseType: 'json',
            
});

        // const options = {
        //     method: 'GET',
        //     url: 'courses/?page=1&page_size=5',
        //     baseURL: API_URL,
        //     headers: {
        //         'Authorization': authHeaderValue,
        //     },
        //     responseType: 'json',
        //   };
        // const response = await axios(options);