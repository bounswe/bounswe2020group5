from rest_framework import serializers
from ..models import Notification, User
from ..serializers import ProductSerializer

class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')
    product = serializers.SerializerMethodField('get_product')

    class Meta:
        model = Notification
        fields = ('text', 'notificationType', 'user', 'createdAt', 'product', 'order')
    
    def get_user(self, obj):
        return obj.user.username
    
    def get_product(self, obj):
        content = ProductSerializer(obj.product).data
        return content
