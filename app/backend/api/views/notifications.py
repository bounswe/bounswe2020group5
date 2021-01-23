from rest_framework import viewsets
from ..serializers import NotificationSerializer
from ..models import Notification
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import status

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

"""
Returns notifications of user
"""
@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: NotificationSerializer(many=True)})
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_notifications(request):
    user = request.user
    notifications = Notification.objects.filter(user=user)
    content = NotificationSerializer(notifications, many=True)

    return Response(data=content.data, status=status.HTTP_200_OK)