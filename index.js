const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Express server created
const app = express();

//Data base
dbConnection();

// CORS
app.use(cors());

//Public directory
app.use( express.static('public') );

//body read and parse
app.use( express.json() );


//Routes
app.use('/api/auth', require('./routes/auth') );
app.use('/api/stories', require('./routes/stories') );

// listening request
app.listen( process.env.PORT, () => {
    console.log(`Servidor running in port ${ process.env.PORT }`);
});