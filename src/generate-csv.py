from pymongo import MongoClient
import pandas as pd
import csv
import credentials

# mongo set up
client = MongoClient(credentials.mongo_url)
db=client.Dataset

# retorna uma lista com id da conta, id do tweet, data e hora, texto, classificação
def get_dataset_list():
    dataset = list()

    cursors = db.tweets.find({ "evals_count": { "$gt": 0 } })
    count = cursors.count()

    print("-> found "+ str(count) + " documents.")

    for collection in cursors:
        evals = [
                collection["sentiments"]["positive"],
                collection["sentiments"]["neutral"],
                collection["sentiments"]["negative"]
            ]
        
        classification = evals.index(max(evals))


        line = [
            collection["username"],
            collection["post_id"],
            collection["post_created_at"].strftime("%d/%m/%Y, %H:%M:%S"), 
            str(collection["text"]),
            classification
            ]

        dataset.append(line)
    return dataset

dataset_list = get_dataset_list()

print(dataset_list[0])

df = pd.DataFrame(dataset_list)
with open('tweets.csv', 'w', encoding="utf-8", newline="\n") as f:
   df.to_csv(f, header=["username", "id", "datetime", "text", "class"], index=False, sep=";", encoding="utf-8", line_terminator='\r\n')