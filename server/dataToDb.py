#########Connect to Db########
from pymongo import MongoClient
MongoClientAddress = "mongodb://tst:test@ds047666.mlab.com"
MongoPort = "47666"
client = MongoClient(MongoClientAddress + ":" + MongoPort)
db = client.pdata
#########Connect to Db Ends########
import requests
url = "https://thingspeak.com/channels/18675/feed.json"
r = requests.get(url, verify=True)
data = r.json()
for item in data:
    print(item)