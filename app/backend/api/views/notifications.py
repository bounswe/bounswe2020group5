from rest_framework import viewsets
from ..serializers import NotificationSerializer
from ..models import Notification

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
