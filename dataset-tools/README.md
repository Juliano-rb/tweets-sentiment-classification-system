# fetch-tweets-to-mongodb

This script was created to build a database that can be used with [tweet-dataset-creator-api](https://github.com/Juliano-rb/tweet-dataset-creator-api) and [tweet-dataset-creator-client](https://github.com/Juliano-rb/tweet-dataset-creator-client).

The purpose of the three projects is to create a colaborative dataset of tweets categorized by emotions. The responsabilities of each project's part are:

1. [fetch-tweets-to-mongodb](https://github.com/Juliano-rb/fetch-tweets-to-mongodb): Fetch tweets to create the initial database containing tweets that will be classified by real people.

2. [tweet-dataset-creator-api](https://github.com/Juliano-rb/tweet-dataset-creator-api): This acts as a end-point to the database previously created. Provide an interface to retrieve a tweet from the database and a way to evaluate a tweet as negative, neutral or positive.

3. [tweet-dataset-creator-client](https://github.com/Juliano-rb/tweet-dataset-creator-client): Is a client that consumes the previous api providing a friendly web page where users can evaluate tweets.

# How to use?
## Prerequisites
* A mongodb database running. I used a free account at https://cloud.mongodb.com/user to this.
* A developer twitter app registered at https://developer.twitter.com/en/apps.

1. Create a ``credentials.py`` file following the estructure of [credentials.example.py](src/credentials.example.py) in src folder replacing `'your*'` strings with your own credentials:

```python
# mongo url
mongo_url = 'your_mongo_connection_url_with_user_and_pass'

# twitter autentication stuffs
t_consumer_key = 'your_twitter_consumer_key'
t_consumer_secret = 'your_twitter_consumer_secret'
t_access_token = 'your_twitter_acces_token'
t_access_token_secret = 'your_twitter_acces_token_secret'
```

2. Install requirements with:
```bash
pip3 install --upgrade pip -r requirements.txt
```
## Fetching tweets about search-terms and save then to a mongo database:

1. In [search-terms](src/search-terms) file you need to put the search terms you want to retrieve tweets about.

2. Run the commands:
```
python src/fetch-tweets-by-searchterm.py
```

## Generating a csv file using the content of the database created:

1. Run the commands:
```
python src/generate-csv.py  
```