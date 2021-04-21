const express = require('express')
const TweetController = require('./controllers/TweetController')

const routes = new express.Router()

routes.get('/tweet', TweetController.retrieve)
routes.post('/evaluate/:id/:evaluation', TweetController.evaluate)
routes.post('/flag/:id', TweetController.flag_tweet)

module.exports = routes