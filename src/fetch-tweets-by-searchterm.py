import tweepy
import json
from pymongo import MongoClient
import credentials

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

tweets_per_term = int(input(bcolors.HEADER + "Fetch how many tweets per search term?\n"+bcolors.ENDC))

# mongo set up
client = MongoClient(credentials.mongo_url)
db=client.Dataset

# twitter set up
auth = tweepy.OAuthHandler(credentials.t_consumer_key, credentials.t_consumer_secret)
auth.set_access_token(credentials.t_access_token,credentials.t_access_token_secret)
api = tweepy.API(auth)

# check if a document exists in the db and return it or null
def already_exists(tweet_id):
    return db.tweets.find_one({"post_id": tweet_id})

# reads the file with search terms list
companies = []
companiespath = 'search-terms'
print(f"reading search terms in file {companiespath}")

with open(companiespath, mode="r", encoding="utf-8") as f:
   for companie in f:
       companie = companie.rstrip()
       print(bcolors.OKBLUE+ f"-> {companie}" + bcolors.ENDC)
       companies.append(companie)

print(f"found {len(companies)} search term")
# iterate over search terms list searching tweets about each of them and storing into a mongodb database
global_count = 0
for companie in companies:
    print(bcolors.HEADER + f'\nfetching tweets about term: {companie}' + bcolors.ENDC)
    # retweets not allowed and we want the pt language (ISO 639-1 Code)
    results = api.search(q="\""+companie+"\""+" -filter:retweets AND -filter:replies", lang='pt', count = tweets_per_term, tweet_mode='extended')
    # tweepy.Cursor(api.search,q=companie+" -filter:retweets").items(maxTweets)

    count = 0
    for t in results:
        tweet = {
            'text':t.full_text,
            'username':t.user.screen_name,
            'post_id':t.id,
            'post_created_at':t.created_at,
            'subject':companie,
            'url' : f"https://twitter.com/{t.user.screen_name}/status/{t.id}"
        }

        if not already_exists(tweet['post_id']):
            result=db.tweets.insert_one(tweet)
            print(bcolors.OKGREEN + str(count) + "-> Inserted: "+ tweet['text'] + bcolors.ENDC )
            count += 1
        else :
            print(bcolors.WARNING + " -> skipping insertion of an already existing tweet in the dataset."+bcolors.ENDC)
    print("{} tweets about {} were inserted into the database".format(count, companie))
    global_count += count

print("The execution was completed successfully.")
print("{} tweets were successfully added to database".format(global_count))