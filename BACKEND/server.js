// This https server implementation was adapted from stackoverflow
// https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
// Setthase
// https://stackoverflow.com/users/1563501/setthase
// Mike 'Pomax' Kamermans
// https://stackoverflow.com/users/740553/mike-pomax-kamermans

const https = require('https')
const dotenv = require('dotenv').config()
const fs = require('fs')
const { app } = require('./app')
const PORT = process.env.PORT || 3000


const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

const server = https.createServer(options, app)

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
 