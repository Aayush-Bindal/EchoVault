from typing import Literal
from bson import ObjectId
from datetime import datetime
from utils.mongo import db_manager


class MongoModel:
    """Base class for MongoDB models"""

    collection_name = None

    @classmethod
    def get_collection(cls):
        if not cls.collection_name:
            raise ValueError("collection_name not defined")
        return db_manager.database.get_collection(cls.collection_name)

    @classmethod
    def create(cls, data):
        collection = cls.get_collection()
        result = collection.insert_one(data)
        data["_id"] = result.inserted_id
        return data

    @classmethod
    def find_by_id(cls, _id):
        collection = cls.get_collection()
        if isinstance(_id, str):
            _id = ObjectId(_id)
        return collection.find_one({"_id": _id})

    @classmethod
    def find(cls, query=None, **kwargs):
        collection = cls.get_collection()
        return collection.find(query or kwargs)

    @classmethod
    def update(cls, _id, data):
        collection = cls.get_collection()
        if isinstance(_id, str):
            _id = ObjectId(_id)
        result = collection.update_one({"_id": _id}, {"$set": data})
        return result.modified_count > 0

    @classmethod
    def delete(cls, _id):
        collection = cls.get_collection()
        if isinstance(_id, str):
            _id = ObjectId(_id)
        result = collection.delete_one({"_id": _id})
        return result.deleted_count > 0


class Chat(MongoModel):
    collection_name = "chats"

    @classmethod
    def create_chat(cls, user_id, title=None):
        data = {
            "user_id": user_id,
            "title": title or f"Chat {datetime.utcnow().strftime('%Y-%m-%d %H:%M')}",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True,
        }
        return cls.create(data)

    @classmethod
    def get_chats_for_user(cls, user_id):
        return cls.find({"user_id": user_id}).sort("updated_at", -1)

    @classmethod
    def update_chat_title(cls, chat_id, title):
        return cls.update(chat_id, {"title": title, "updated_at": datetime.utcnow()})


class Message(MongoModel):
    collection_name = "messages"

    MESSAGE_TYPE_TEXT = "text"
    MESSAGE_TYPE_VOICE = "voice"
    MESSAGE_TYPE_AI = "ai"

    @classmethod
    def create_message(
        cls,
        chat_id: ObjectId,
        content: str,
        message_type: Literal["text", "voice", "ai"],
        markdown_content: str,
        user_id=None,
        voice_file_path=None,
        emotion_analysis_id=None,
    ):
        data = {
            "chat_id": chat_id,
            "content": content,
            "message_type": message_type,
            "markdown_content": markdown_content,
            "user_id": user_id,
            "created_at": datetime.utcnow(),
            "voice_file_path": voice_file_path,
            "emotion_analysis_id": emotion_analysis_id,
        }

        # Update the chat's updated_at timestamp
        Chat.update(chat_id, {"updated_at": datetime.utcnow()})

        return cls.create(data)

    @classmethod
    def get_messages_for_chat(cls, chat_id, limit=100, skip=0):
        if isinstance(chat_id, str):
            chat_id = ObjectId(chat_id)
        collection = cls.get_collection()
        return (
            collection.find({"chat_id": chat_id})
            .sort("created_at", 1)
            .skip(skip)
            .limit(limit)
        )


class EmotionAnalysis(MongoModel):
    collection_name = "emotion_analyses"

    @classmethod
    def create_analysis(cls, user_id, message_id, text_content, emotion_data):
        data = {
            "user_id": user_id,
            "message_id": message_id,
            "text_content": text_content,
            "emotion_data": emotion_data,  # This will be the large array from your AI model
            "created_at": datetime.utcnow(),
        }
        return cls.create(data)

    @classmethod
    def get_analyses_for_user(cls, user_id, limit=100, skip=0):
        collection = cls.get_collection()
        return (
            collection.find({"user_id": user_id})
            .sort("created_at", -1)
            .skip(skip)
            .limit(limit)
        )

    @classmethod
    def get_dominant_emotion(cls, analysis_id):
        analysis = cls.find_by_id(analysis_id)
        if not analysis or "emotion_data" not in analysis:
            return None

        # This is a simplified example - adjust based on your actual emotion data structure
        emotion_data = analysis["emotion_data"]
