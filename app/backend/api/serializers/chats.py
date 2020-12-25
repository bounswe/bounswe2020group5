from rest_framework import serializers
from ..models.chats import Chat, Message

#Chat Serializer
class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ['id', 'vendor_id', 'customer_id']
    

#Message Serializer
class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ['id', 'whose_message', 'context', 'chat']

class ChatCreateSerializer(serializers.Serializer):
    vendor_id = serializers.CharField(required=True)
    context = serializers.CharField(required=True)
