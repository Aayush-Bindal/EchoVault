from pymongo import MongoClient
from dotenv import load_dotenv
from os import getenv

load_dotenv()

MONGO_URI = getenv("MONGO_URI")
assert MONGO_URI is not None or MONGO_URI != "", "MONGO URI NOT SET"


class MongoDBManager:
    def __init__(self) -> None:
        client = MongoClient(MONGO_URI)
        self.database = client.get_database("echovault")

        assert client is not None, "Mongo URI is wrong"
        assert self.database is not None, "Mongo database not found"

    def user_collection(self):
        assert self.database.get_collection("users") is not None, (
            "Collection user not found"
        )
        return self.database.get_collection("users")


db_manager = MongoDBManager()
