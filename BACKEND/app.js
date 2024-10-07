// This express app configuration was adapted from mozilla
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const { connectDB } = require('./db/conn')
const authRoute = require('./routes/auth');
const customerRoute = require('./routes/customer');

const urlprefix = '/api'
const ORIGIN_PORT = process.env.ORIGIN_PORT || 4200

connectDB() 

// this cors configuration was adapted from dev
// https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h#:~:text=Configuring%20CORS%20in%20Node.js%20with%20Express%20is%20a%20fundamental%20step
// Nilesh Raut
// https://dev.to/speaklouder
const corsOptions = {
    origin: `https://localhost:${ORIGIN_PORT}`,  // Allow requests from Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],  // Allow these headers
    credentials: true,  // Allow credentials (cookies, etc.)
    optionsSuccessStatus: 204  // Use 204 status for successful preflight response
  };

  
app.use(cors(corsOptions))

app.use(express.json()); 

app.use(`${urlprefix}/auth`, authRoute);
app.use(`${urlprefix}/payment`, customerRoute);



module.exports = { app }


