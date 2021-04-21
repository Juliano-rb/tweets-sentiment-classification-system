const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()

const server = require('http').Server(app)

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true
})

app.use(cors());

app.use(bodyParser.json())

app.use(require('./routes'))

server.listen(process.env.PORT || 3333)