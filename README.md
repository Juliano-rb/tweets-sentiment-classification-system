# tweet-dataset-creator-api
This acts as a end-point to the mongodb database previously created. Provide an interface to retrieve a tweet from the database and a way to evaluate a tweet as negative, neutral or positive.

*More project description at: https://github.com/Juliano-rb/fetch-tweets-to-mongodb*

## Requirements
1. A running mongodb database populated with tweets by https://github.com/Juliano-rb/fetch-tweets-to-mongodb

## Running
1. Create an ``.env`` file in the project's root folder:
```bash
MONGO_URL=YOUR_MONGO_DATABASE_URL
```

2. Run:
```
npm install
```

4. Well done! The server is listening on: ``localhost:3333``


## Available endpoints:

* ``GET /tweet``: returns a tweet from database.
* ``POST /evaluate/:id/:evaluation``: sets a sentiment evaluation for a tweet
* ``POST /flag/:id``: flags a tweet as inappropriate or not useful