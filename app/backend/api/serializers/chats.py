from rest_framework import serializers
from ..models.chats import Chat, Message
from ..models.users import User

#Chat Serializer
class ChatSerializer(serializers.ModelSerializer):
    customer_id = serializers.SerializerMethodField('get_customer_id')
    vendor_id = serializers.SerializerMethodField('get_vendor_id')
    class Meta:
        model = Chat
        fields = ('id', 'vendor_id', 'customer_id')
    
    def get_customer_id(self, obj):
        customer = User.objects.get(id=obj.customer_id)
        return customer.first_name + " " + customer.last_name

    def get_vendor_id(self, obj):
        vendor = User.objects.get(id=obj.vendor_id)
        return vendor.first_name + " " + vendor.last_name

#Message Serializer
class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('id', 'whose_message', 'context', 'chat')

class ChatCreateSerializer(serializers.Serializer):
    vendor_id = serializers.CharField(required=True)

class SendMessageSerializer(serializers.Serializer):
    chat_id = serializers.CharField(required=True)
    context = serializers.CharField(required=True)

class GetChatPropertySerializer(serializers.Serializer):
    chat_id = serializers.CharField(required=True)

class EmptySerializer(serializers.Serializer):
    pass

class GetMessagePropertySerializer(serializers.Serializer):
    message_id = serializers.CharField(required=True)
    chat_id = serializers.CharField(required=True)

class ChatSuccessSerializer(serializers.Serializer):
    success = serializers.CharField()

class PropertiesSerializer(serializers.Serializer):
    id = serializers.CharField(required=True)
    date_created = serializers.DateTimeField()
    success = serializers.CharField()
