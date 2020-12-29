from rest_framework import serializers
from ..models.chats import Chat, Message
from ..models.users import User

#Chat Serializer
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'vendor_username', 'customer_username', 'product_id', 'time')
    
#Message Serializer
class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('id', 'content', 'time', 'whose_message', 'chat')

class ChatCreateSerializer(serializers.Serializer):
    vendor_username = serializers.CharField(required=True)

class SendMessageSerializer(serializers.Serializer):
    chat_id = serializers.CharField(required=True)
    context = serializers.CharField(required=True)

class GetChatPropertySerializer(serializers.Serializer):
    chat_id = serializers.CharField(required=True)

class CreateChatResponseSerializer(serializers.Serializer):
    success = serializers.CharField(max_length=100)
    chat = ChatSerializer()

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
