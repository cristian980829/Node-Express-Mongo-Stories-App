const express = require('express');
require('dotenv').config();

//Express server created
const app = express();

//Public directory
app.use( express.static('public') );

//body read and parse
app.use( express.json() );


// listening request
app.listen( process.env.PORT, () => {
    console.log(`Servidor running in port ${ process.env.PORT }`);
});