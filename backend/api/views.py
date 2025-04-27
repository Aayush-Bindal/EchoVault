import os
import subprocess
from datetime import datetime

from django.conf import settings

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Chat, Message, EmotionAnalysis
from .serializers import (
    ChatSerializer,
    MessageSerializer,
    VoiceMessageSerializer,
    EmotionAnalysisSerializer,
)

from services.speech_to_text import speech_to_text
from services.emotion_analyzer import analyze_emotion
from services.create_markdown import return_markdown
from oauth2.authentication import JWTAuthentication


class ChatViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]

    def list(self, request):
        """Get all chats for the current user"""
        user_id = str(request.user.id)
        chats = list(Chat.get_chats_for_user(user_id))
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)

    def create(self, request):
        """Create a new chat"""
        data = request.data.copy()
        data["user_id"] = str(request.user.id)

        serializer = ChatSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            chat = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """Get a specific chat by ID"""
        try:
            chat = Chat.find_by_id(pk)
            if not chat:
                return Response(status=status.HTTP_404_NOT_FOUND)

            # Check if user owns this chat
            user_id = str(request.user.id)
            if chat.get("user_id") != user_id:
                return Response(status=status.HTTP_403_FORBIDDEN)

            serializer = ChatSerializer(chat)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """Update a chat (e.g., change the title)"""
        try:
            chat = Chat.find_by_id(pk)
            if not chat:
                return Response(status=status.HTTP_404_NOT_FOUND)

            # Check if user owns this chat
            user_id = str(request.user.id)
            if chat.get("user_id") != user_id:
                return Response(status=status.HTTP_403_FORBIDDEN)

            serializer = ChatSerializer(chat, data=request.data, partial=True)
            if serializer.is_valid():
                updated_chat = serializer.save()
                return Response(ChatSerializer(updated_chat).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get"])
    def messages(self, request, pk=None):
        """Get messages for a specific chat"""
        try:
            # Check if user owns this chat
            chat = Chat.find_by_id(pk)
            if not chat:
                return Response(status=status.HTTP_404_NOT_FOUND)

            user_id = str(request.user.id)
            if chat.get("user_id") != user_id:
                return Response(status=status.HTTP_403_FORBIDDEN)

            # Get pagination parameters
            limit = int(request.query_params.get("limit", 50))
            skip = int(request.query_params.get("skip", 0))

            messages = list(Message.get_messages_for_chat(pk, limit, skip))
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class MessageViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]

    def create(self, request):
        """Create a new text message"""
        # Add current user as sender
        data = request.data.copy()
        data["user_id"] = str(request.user.id)
        data["message_type"] = Message.MESSAGE_TYPE_TEXT

        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            # Check if user owns the chat
            chat_id = data.get("chat_id")
            chat = Chat.find_by_id(chat_id)
            if not chat:
                return Response(
                    {"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND
                )

            user_id = str(request.user.id)
            if chat.get("user_id") != user_id:
                return Response(
                    {"error": "You don't have access to this chat"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            message = serializer.save()
            return Response(
                MessageSerializer(message).data, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=False, methods=["post"], parser_classes=[MultiPartParser, FormParser]
    )
    async def voice(self, request):
        """Handle voice message uploads, convert to text, and analyze emotion"""
        serializer = VoiceMessageSerializer(data=request.data)
        if serializer.is_valid():
            user_id = str(request.user.id)
            chat_id = serializer.validated_data["chat_id"]
            voice_file = serializer.validated_data["voice_file"]

            # Check if user owns the chat
            chat = Chat.find_by_id(chat_id)
            if not chat:
                return Response(
                    {"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND
                )

            if chat.get("user_id") != user_id:
                return Response(
                    {"error": "You don't have access to this chat"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            # Save the voice file
            # In a production app, you might want to use a cloud storage service
            voice_files_dir = os.path.join(settings.MEDIA_ROOT, 'voice_files')
            os.makedirs(voice_files_dir, exist_ok=True)

# Generate a unique filename
            filename = f"{user_id}_{chat_id}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.wav"
            voice_file_path = os.path.join(voice_files_dir, filename)

# Save the file
            with open(voice_file_path, 'wb') as dest:
                for chunk in voice_file.chunks():
                    dest.write(chunk)

            # Convert intial file to 16kHz
            temp_path = voice_file_path + '.temp.wav'

            subprocess.run(["ffmpeg", "-y", "-i", voice_file_path, "-ac", "1", "-ar", "16000", temp_path], check=True)
            os.replace(temp_path, voice_file_path)
            try:
                # Convert speech to text
                text_content = speech_to_text(voice_file_path)
                markdown_content = return_markdown(text_content)

                # Create the message first
                message_data = {
                    "chat_id": chat_id,
                    "content": text_content,
                    "message_type": Message.MESSAGE_TYPE_VOICE,
                    "markdown_content": markdown_content,
                    "user_id": user_id,
                    "voice_file_path": voice_file_path,
                }
                message_serializer = MessageSerializer(data=message_data)

                if message_serializer.is_valid():
                    message = message_serializer.save()

                    # Analyze emotion in the text
                    emotion_data = await analyze_emotion(text_content)

                    # Store emotion analysis
                    analysis_data = {
                        "user_id": user_id,
                        "message_id": str(message["_id"]),
                        "text_content": text_content,
                        "emotion_data": emotion_data,
                    }

                    analysis_serializer = EmotionAnalysisSerializer(data=analysis_data)
                    if analysis_serializer.is_valid():
                        analysis = analysis_serializer.save()

                        # Update the message with the emotion analysis ID
                        Message.update(
                            message["_id"], {"emotion_analysis_id": analysis["_id"]}
                        )

                        # Get the updated message
                        updated_message = Message.find_by_id(message["_id"])

                        return Response(
                            {
                                "message": MessageSerializer(updated_message).data,
                                "emotion_analysis": EmotionAnalysisSerializer(
                                    analysis
                                ).data,
                            },
                            status=status.HTTP_201_CREATED,
                        )

                    return Response(
                        analysis_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                    )

                return Response(
                    message_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

            except Exception as e:
                return Response(
                    {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmotionAnalysisViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]

    def list(self, request):
        """Get all emotion analyses for the current user"""
        user_id = str(request.user.id)

        # Get pagination parameters
        limit = int(request.query_params.get("limit", 50))
        skip = int(request.query_params.get("skip", 0))

        analyses = list(EmotionAnalysis.get_analyses_for_user(user_id, limit, skip))
        serializer = EmotionAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """Get a specific emotion analysis by ID"""
        try:
            analysis = EmotionAnalysis.find_by_id(pk)
            if not analysis:
                return Response(status=status.HTTP_404_NOT_FOUND)

            # Check if user owns this analysis
            user_id = str(request.user.id)
            if analysis.get("user_id") != user_id:
                return Response(status=status.HTTP_403_FORBIDDEN)

            serializer = EmotionAnalysisSerializer(analysis)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get"])
    def dominant_emotion(self, request, pk=None):
        """Get the dominant emotion for an analysis"""
        try:
            analysis = EmotionAnalysis.find_by_id(pk)
            if not analysis:
                return Response(status=status.HTTP_404_NOT_FOUND)

            # Check if user owns this analysis
            user_id = str(request.user.id)
            if analysis.get("user_id") != user_id:
                return Response(status=status.HTTP_403_FORBIDDEN)

            dominant_emotion = EmotionAnalysis.get_dominant_emotion(pk)
            return Response({"dominant_emotion": dominant_emotion})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
