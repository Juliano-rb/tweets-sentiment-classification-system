# dataset-generator

## Populating the database with tweets
Before running the application, you need to prepare the envrioment (getting an api token from twitter, populating the database with database tools...). To do so, you need to follow https://github.com/Juliano-rb/tweets-sentiment-classification-system/tree/main/dataset-generator/dataset-tools#prerequisites

## Running the application with a builtin mongodb database:
```
docker-compose build && docker-compose up
```

## Running the application with an external mongodb database:
1. Create a ``.env`` with your ``MONGO_URL`` (your connection string) following the .env.example file.
2. Run:
```
docker-compose build && docker-compose -f docker-compose.externalmongo.yml up
```
