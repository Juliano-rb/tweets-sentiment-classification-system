# dataset-generator

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