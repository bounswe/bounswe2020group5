from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import Message, Chat, User
from ..serializers import MessageSerializer, ChatSerializer, ChatCreateSerializer, SuccessSerializer, PropertiesSerializer, ErrorSerializer
from ..serializers import SendMessageSerializer, GetChatPropertySerializer, EmptySerializer, GetMessagePropertySerializer, ChatSuccessSerializer
from ..utils import create_user_account, create_temp_user_account, send_email, create_chat, create_message, is_found_a_chat
from rest_framework import serializers
from django.conf import settings
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site

from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_500_INTERNAL_SERVER_ERROR
)

from drf_yasg.utils import swagger_auto_schema

class ChatViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'create_chat': ChatCreateSerializer,
        'send_message': SendMessageSerializer,
        'get_last_message': GetChatPropertySerializer,
        'get_chat_history': GetChatPropertySerializer,
        'get_all_chats': EmptySerializer,
        'delete_chat': GetChatPropertySerializer,
        'delete_message':GetMessagePropertySerializer,
    }
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: PropertiesSerializer, status.HTTP_400_BAD_REQUEST: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def create_chat(self, request):
        vendor_id = request.data.get("vendor_id")
        user = User.objects.get(id=request.user.id)
        if not user.is_customer:
            return Response(data={'error': 'Only customers can create a chat'}, status=HTTP_400_BAD_REQUEST)
        try:
            vendor = User.objects.get(id=vendor_id)
        except:
            return Response(data={'error': 'There is not such user with that id'}, status=HTTP_400_BAD_REQUEST)
        if not vendor.is_vendor:
            return Response(data={'error': 'The user is not a vendor'}, status=HTTP_400_BAD_REQUEST)
        is_present = Chat.objects.filter(vendor_id=vendor_id,customer_id=user.id)
        if is_present:
            return Response(data={'error': 'The chat with this vendor already exists'}, status=HTTP_400_BAD_REQUEST)
        customer_id = user.id 
        chat = create_chat(customer_id, vendor_id)
        data = {
            "success": "conversation is created. Happy chatting",
            "chat_id": chat.id,
            "data_created": chat.date_created
            }
        return Response(data=data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: PropertiesSerializer, status.HTTP_404_NOT_FOUND: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def send_message(self, request):
        chat_id = request.data.get("chat_id")
        context = request.data.get("context")
        usr = User.objects.get(id=request.user.id)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"there is no such chat with that id or the user is not allowed get the chat history"}, status=HTTP_404_NOT_FOUND)
        message = create_message(context,chat,usr.is_customer)
        data = {
            "success":"message is sent",
            "message_id":message.id,
            "date_sent": message.date_sent
        }
        return Response(data=data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ChatSuccessSerializer,status.HTTP_404_NOT_FOUND: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def get_last_message(self, request):
        chat_id = request.data.get("chat_id")
        usr = User.objects.get(id=request.user.id)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"there is no such chat with that id or the user is not allowed get the chat history"}, status=HTTP_404_NOT_FOUND)
        message = Message.objects.filter(chat_id=chat_id)
        if not message:
            return Response(data={"error":"there is no message in this chat"}, status=HTTP_404_NOT_FOUND)
        message_contents = MessageSerializer(message, many=True)
        return Response(data=message_contents.data[len(message_contents.data)-1], status=status.HTTP_200_OK)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ChatSuccessSerializer, status.HTTP_404_NOT_FOUND: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def get_chat_history(self, request):
        chat_id = request.data.get("chat_id")
        usr = User.objects.get(id=request.user.id)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"there is no such chat with that id or the user is not allowed get the chat history"}, status=HTTP_404_NOT_FOUND)
        message = chat.message_set.all()
        message_contents = MessageSerializer(message, many=True)
        return Response(data=message_contents.data, status=status.HTTP_200_OK)
   
    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ChatSuccessSerializer, status.HTTP_404_NOT_FOUND: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def get_all_chats(self, request):
        user_id = request.user.id
        usr = User.objects.get(id=user_id)
        chats = None
        if usr.is_customer:
            chats = Chat.objects.filter(customer_id=user_id)
        else:
            chats = Chat.objects.filter(vendor_id=user_id)
        if not chats:
            return Response(data={"error":"there is no chat the user is involved"}, status=status.HTTP_404_NOT_FOUND)
        chats_contents = ChatSerializer(chats, many=True)
        return Response(data=chats_contents.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='delete', responses={status.HTTP_200_OK: SuccessSerializer, status.HTTP_404_NOT_FOUND: ErrorSerializer})
    @action(methods=['DELETE', ], detail=False, permission_classes=[IsAuthenticated, ])
    def delete_chat(self, request):
        chat_id = request.data.get("chat_id")
        usr = User.objects.get(id=request.user.id)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"The chat does not exists or there is no such chat the user is allowed to delete"}, status=HTTP_404_NOT_FOUND)
        try:
            chat.delete()
        except:
            return Response(data={"error":"The chat is not deleted"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"success":"The chat is deleted"}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='delete', responses={status.HTTP_200_OK: SuccessSerializer, status.HTTP_404_NOT_FOUND: ErrorSerializer,status.HTTP_500_INTERNAL_SERVER_ERROR: ErrorSerializer})
    @action(methods=['DELETE', ], detail=False, permission_classes=[IsAuthenticated, ])
    def delete_message(self, request):
        message_id = request.data.get("message_id")
        chat_id = request.data.get("chat_id")
        user_id = request.user.id
        usr = User.objects.get(id=user_id)
        
        message = Message.objects.filter(whose_message=usr.is_customer,id=message_id,chat_id=chat_id)
        if not message:
            return Response(data={"error":"The message does not exists or there is no message the user is allowed to delete"}, status=status.HTTP_404_NOT_FOUND)
        try:
            message.delete()
        except Exception as e:
            return Response(data={"error":"The message is not deleted"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"success":"The message is deleted"}, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()