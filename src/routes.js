const express = require('express')
const TweetController = require('./controllers/TweetController')

const routes = new express.Router()

routes.get('/tweet', TweetController.retrieve)
routes.post('/evaluate/:id/:evaluation', TweetController.evaluate)

module.exports = routes