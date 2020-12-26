from rest_framework import serializers
from ..models.chats import Chat, Message

#Chat Serializer
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'vendor_id', 'customer_id')

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
