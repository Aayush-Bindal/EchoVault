from pymongo import MongoClient
from dotenv import load_dotenv
from os import getenv

load_dotenv()

MONGO_URI = getenv("MONGO_URI")
assert MONGO_URI is not None or MONGO_URI != "", "MONGO URI NOT SET"


class MongoDBManager:
    def __init__(self) -> None:
        self.client = MongoClient(MONGO_URI)
        self.database = self.client.get_database("echovault")

        assert self.client is not None, "Mongo URI is wrong"
        assert self.database is not None, "Mongo database not found"

    def user_collection(self):
        assert self.database.get_collection("users") is not None, (
            "Collection user not found"
        )
        return self.database.get_collection("users")

    def chats_collection(self):
        return self.database.get_collection("chats")

    def messages_collection(self):
        return self.database.get_collection("messages")

    def emotion_analyses_collection(self):
        return self.database.get_collection("emotion_analyses")

    def state_collection(self):
        return self.database.get_collection("oauth2_state")


db_manager = MongoDBManager()
