#########Connect to Db########
from pymongo import MongoClient
MongoClientAddress = "mongodb://127.0.0.1"
MongoPort = "12345"
client = MongoClient(MongoClientAddress + ":" + MongoPort)
db = client.pdata
#db=MongoClient("mongodb://test:test@ds047666.mlab.com:47666/pdata")
print(db)
#########Connect to Db Ends########
import requests
import json
url = "https://thingspeak.com/channels/18675/feed.json"
r = requests.get(url, verify=True)
data = r.json()
user_id = data['channel']['id']
print(user_id)
for item in data['feeds']:
    item['user_id'] = str(user_id)
    print(item)
#    db.data.insert(item)
    cursor = db.data.find({"user_id":user_id})
    if cursor.count() > 0:
        print(duplicate)
    else:
        print("not")
        result = db.data.insert(item)
        print(result)
        
    