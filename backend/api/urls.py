from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, MessageViewSet, EmotionAnalysisViewSet

router = DefaultRouter()
router.register(r"", ChatViewSet, basename="chat")
router.register(r"messages", MessageViewSet, basename="message")
router.register(r"analyses", EmotionAnalysisViewSet, basename="emotion-analysis")

urlpatterns = [
    path("", include(router.urls)),
]
