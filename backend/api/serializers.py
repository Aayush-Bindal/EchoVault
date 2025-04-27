from rest_framework import serializers
from bson import ObjectId
from datetime import datetime

from .models import Chat, Message, EmotionAnalysis


class ObjectIdField(serializers.Field):
    """Custom field for MongoDB ObjectId serialization"""

    def to_representation(self, value):
        if isinstance(value, ObjectId):
            return str(value)
        return value

    def to_internal_value(self, data):
        try:
            return ObjectId(data)
        except:
            raise serializers.ValidationError("Invalid ObjectId format")


class DateTimeField(serializers.Field):
    """Custom field for datetime serialization"""

    def to_representation(self, value):
        if isinstance(value, datetime):
            return value.isoformat()
        return value

    def to_internal_value(self, data):
        try:
            return datetime.fromisoformat(data)
        except:
            raise serializers.ValidationError("Invalid datetime format")


class ChatSerializer(serializers.Serializer):
    id = serializers.CharField(source="_id", read_only=True)
    user_id = serializers.CharField()
    title = serializers.CharField()
    created_at = DateTimeField(read_only=True)
    updated_at = DateTimeField(read_only=True)
    is_active = serializers.BooleanField(default=True)

    def create(self, validated_data):
        user_id = validated_data["user_id"]
        title = validated_data.get("title", None)
        return Chat.create_chat(user_id, title)

    def update(self, instance, validated_data):
        chat_id = instance.get("_id")
        if "title" in validated_data:
            Chat.update_chat_title(chat_id, validated_data["title"])
        return Chat.find_by_id(chat_id)


class MessageSerializer(serializers.Serializer):
    id = ObjectIdField(source="_id", read_only=True)
    chat_id = ObjectIdField()
    content = serializers.CharField()
    message_type = serializers.CharField()
    markdown_content = serializers.CharField()
    user_id = serializers.CharField(allow_null=True)
    created_at = DateTimeField(read_only=True)
    voice_file_path = serializers.CharField(allow_null=True, required=False)
    emotion_analysis_id = ObjectIdField(allow_null=True, required=False)

    def create(self, validated_data):
        chat_id = validated_data.get("chat_id")
        content = validated_data.get("content")
        message_type = validated_data.get("message_type")
        user_id = validated_data.get("user_id")
        voice_file_path = validated_data.get("voice_file_path")
        emotion_analysis_id = validated_data.get("emotion_analysis_id")

        return Message.create_message(
            chat_id,
            content,
            message_type,
            user_id,
            voice_file_path,
            emotion_analysis_id,
        )


class VoiceMessageSerializer(serializers.Serializer):
    chat_id = ObjectIdField()
    voice_file = serializers.FileField()

    # This is a write-only serializer for handling voice uploads
    # No need for update method since this is only for creating


class EmotionAnalysisSerializer(serializers.Serializer):
    id = ObjectIdField(source="_id", read_only=True)
    user_id = serializers.CharField()
    message_id = ObjectIdField()
    text_content = serializers.CharField(allow_blank=True, default="[Voice Message]")
    emotion_data = serializers.JSONField(allow_null=True, default=dict)
    created_at = DateTimeField(read_only=True)

    def create(self, validated_data):
        user_id = validated_data.get("user_id")
        message_id = validated_data.get("message_id")
        text_content = validated_data.get("text_content")
        emotion_data = validated_data.get("emotion_data")

        return EmotionAnalysis.create_analysis(
            user_id, message_id, text_content, emotion_data
        )
