from rest_framework import viewsets
from ..serializers import NotificationSerializer, SuccessSerializer, SetNotificationSeenSerializer
from ..models import Notification
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import status
from api.custom_permissions import IsAuthCustomer
from rest_framework.permissions import IsAuthenticated


class NotificationViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthCustomer, AllowAny]
    serializer_classes = {
        'all': NotificationSerializer,
        'my': NotificationSerializer,
        'set_seen' : SetNotificationSeenSerializer
    }
    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: NotificationSerializer(many=True)})
    @action(methods=['GET', ], detail=False, permission_classes=[AllowAny])
    def all(self, request):
        notifications = Notification.objects.all()
        content = NotificationSerializer(notifications, many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)

    """
    Returns user notifications
    """
    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: NotificationSerializer(many=True)})
    @action(methods=['GET', ], detail=False, permission_classes=[IsAuthenticated,])
    def my(self, request):
        user = request.user
        notifications = Notification.objects.filter(user=user)
        notifications = notifications.order_by('-createdAt')
        content = NotificationSerializer(notifications, many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)
    
    """
    Takes notification id and marked notification as seen.
    """
    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer}, request_body=SetNotificationSeenSerializer)
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated,])
    def set_seen(self, request):
        serializer = SetNotificationSeenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        notification_id = serializer.validated_data['notification_id']

        notification = Notification.objects.filter(id=notification_id).first()     
        if notification:
            if request.user != notification.user:
                return Response(data={'error': 'Notification does not belong requested user.'}, status=status.HTTP_400_BAD_REQUEST)

            notification.isSeen = True
            notification.save()
        else:
            return Response(data={'error': 'Notification does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(data={'success': 'Notification is successfully set as seen.'}, status=status.HTTP_200_OK)        

