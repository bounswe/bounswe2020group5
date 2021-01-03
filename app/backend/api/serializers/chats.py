from rest_framework import serializers
from ..models.chats import Chat, Message, UnreadMessages
from ..models.users import User

#Chat Serializer
class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ('id', 'vendor_username', 'customer_username', 'product_id', 'created_date')

    
#Message Serializer
class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('id', 'content', 'date_sent', 'whose_message', 'chat')

#UnreadMessages Serializer
class UnreadMessagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = UnreadMessages
        fields = "__all__"

class ChatsWithMessagesSerializer(serializers.Serializer):
    chat = ChatSerializer()
    messages = MessageSerializer(many=True)

class GetAllChatsResponseSerializer(serializers.Serializer):
    success = serializers.CharField(max_length=100)
    chats = ChatsWithMessagesSerializer(many=True)

class ChatCreateSerializer(serializers.Serializer):
    vendor_username = serializers.CharField(required=True)

class SendMessageSerializer(serializers.Serializer):
    chat_id = serializers.CharField(required=True)
    content = serializers.CharField(required=True)

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

class SendMessageResponseSerializer(serializers.Serializer):
    success = serializers.CharField()
    message = MessageSerializer()

class ChatHistoryResponseSerializer(serializers.Serializer):
    success = serializers.CharField()
    messages = MessageSerializer(many=True)

class NumberOfUnreadMessagesResponseSerializer(serializers.Serializer):
    number = serializers.IntegerField()