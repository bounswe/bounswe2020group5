from rest_framework import viewsets
from ..serializers import NotificationSerializer
from ..models import Notification
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import status
from api.custom_permissions import IsAuthCustomer

class NotificationViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthCustomer, AllowAny]
    serializer_classes = {
        'all': NotificationSerializer,
        'my': NotificationSerializer,
    }
    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: NotificationSerializer(many=True)})
    @action(methods=['GET', ], detail=False, permission_classes=[AllowAny])
    def all(self, request):
        notifications = Notification.objects.all()
        content = NotificationSerializer(notifications, many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: NotificationSerializer(many=True)})
    @action(methods=['GET', ], detail=False, permission_classes=[IsAuthCustomer,])
    def my(self, request):
        user = request.user
        notifications = Notification.objects.filter(user=user)
        content = NotificationSerializer(notifications, many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)

    
