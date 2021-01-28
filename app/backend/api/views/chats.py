from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import Message, Chat, User, UnreadMessages
from ..serializers import MessageSerializer, ChatSerializer, ChatCreateSerializer, SuccessSerializer, NumberOfUnreadMessagesResponseSerializer
from ..serializers import PropertiesSerializer, ErrorSerializer, CreateChatResponseSerializer, SendMessageResponseSerializer
from ..serializers import SendMessageSerializer, GetChatPropertySerializer, EmptySerializer, GetMessagePropertySerializer, ChatSuccessSerializer
from ..serializers import GetAllChatsResponseSerializer, ChatHistoryResponseSerializer, UnreadMessagesSerializer
from ..utils import create_user_account, create_temp_user_account, send_email, create_chat, create_message, is_found_a_chat, create_unread_message
from rest_framework import serializers
from django.conf import settings
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
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
        'delete_message': GetMessagePropertySerializer,
        'get_unread_messages_number': EmptySerializer
    }

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: CreateChatResponseSerializer, status.HTTP_200_OK: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def create_chat(self, request):
        vendor_username = request.data.get("vendor_username")
        product_id = request.data.get("product_id")
        user = User.objects.get(id=request.user.id)
        if not user.is_customer:
            return Response(data={'error': 'Only customers can create a chat'}, status=HTTP_200_OK)
        try:
            vendor = User.objects.get(username=vendor_username)
        except:
            return Response(data={'error': 'There is not such user with that username'}, status=HTTP_200_OK)
        if not vendor.is_vendor:
            return Response(data={'error': 'The user is not a vendor'}, status=HTTP_200_OK)
        is_present = Chat.objects.filter(vendor_username=vendor_username, customer_username=user.username, product_id=product_id)
        if is_present:
            return Response(data={'error': 'The chat with this vendor about this product already exists'}, status=HTTP_200_OK)
        customer_username = user.username
        chat = create_chat(customer_username, vendor_username, product_id)
        chat_response = ChatSerializer(chat)
        data = {
            "success": "True",
            "chat": chat_response.data 
            }
        print("DATA ",data)
        return Response(data=data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SendMessageResponseSerializer, status.HTTP_202_ACCEPTED: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def send_message(self, request):
        chat_id = request.data.get("chat_id")
        content = request.data.get("content")
        usr = User.objects.get(id=request.user.id)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"there is no such chat with that id or the user is not allowed get the chat history"}, status=status.HTTP_202_ACCEPTED)
        to_whom = ""
        whose_message = ""
        if usr.is_customer:
            to_whom = "vendor"
            whose_message = "customer"
        else:
            to_whom = "customer"
            whose_message = "vendor"

        create_unread_message(chat_id,to_whom)
        
        message = create_message(content,chat,whose_message)
        message = MessageSerializer(message)
        data = {
            "success":"True",
            "message":message.data,
        }
        return Response(data=data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SendMessageResponseSerializer, status.HTTP_202_ACCEPTED: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def get_last_message(self, request):
        chat_id = request.data.get("chat_id")
        usr = User.objects.get(id=request.user.id)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"there is no such chat with that id or the user is not allowed get the chat history"}, status=status.HTTP_202_ACCEPTED)
        message = Message.objects.filter(chat_id=chat_id)
        if not message:
            return Response(data={"alert":"Chat exists but there is no message in it"}, status=status.HTTP_202_ACCEPTED)
        message_contents = MessageSerializer(message, many=True)
        data = {
            "success":"True",
            "message": message_contents.data[len(message_contents.data)-1]
        }
        to_whom = ""
        if usr.is_customer:
            to_whom = "customer"
        else:
            to_whom = "vendor"
        unread_messages = UnreadMessages.objects.filter(chat_id=chat_id,to_whom=to_whom)
        if unread_messages:
            unread_messages.delete()
        return Response(data=data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: GetAllChatsResponseSerializer, status.HTTP_202_ACCEPTED: ErrorSerializer})
    @action(methods=['GET', ], detail=False, permission_classes=[IsAuthenticated, ])
    def get_all_chats(self, request):
        user_id = request.user.id
        usr = User.objects.get(id=user_id)
        chats = None
        to_whom = ""
        if usr.is_customer:
            chats = Chat.objects.filter(customer_username=usr.username)
            to_whom = "customer"
        else:
            chats = Chat.objects.filter(vendor_username=usr.username)
            to_whom = "vendor"
        if not chats:
            return Response(data={"error":"there is no chat the user is involved"}, status=status.HTTP_202_ACCEPTED)
        chats_contents = ChatSerializer(chats, many=True)
        data = {
            "success": "True",
            "chats": []
        }
        for chat in chats_contents.data:
            id = 0
            for item in chat:
                id = chat[item]
                break
            chat = Chat.objects.get(id=id)
            chat_properties = ChatSerializer(chat)
            chat_properties_dict = dict(chat_properties.data)
            messages = chat.message_set.all()
            message_contents = MessageSerializer(messages, many=True)
            chat_properties_dict["messages"] = message_contents.data
            data["chats"].append(chat_properties_dict)
            UnreadMessages.objects.filter(chat_id=id,to_whom=to_whom).delete()
        return Response(data=data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ChatHistoryResponseSerializer, status.HTTP_202_ACCEPTED: ErrorSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def get_chat_history(self, request):
        chat_id = request.data.get("chat_id")
        usr = User.objects.get(id=request.user.id)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"there is no such chat with that id or the user is not allowed get the chat history"}, status=status.HTTP_202_ACCEPTED)
        message = chat.message_set.all()
        message_contents = MessageSerializer(message, many=True)
        data = {
            "success": "True",
            "messages": message_contents.data
        }
        to_whom = ""
        if usr.is_customer:
            to_whom = "customer"
        else:
            to_whom = "vendor"
        UnreadMessages.objects.filter(chat_id=id,to_whom=to_whom).delete()
        return Response(data=data, status=status.HTTP_200_OK)


    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: NumberOfUnreadMessagesResponseSerializer, status.HTTP_202_ACCEPTED: ErrorSerializer})
    @action(methods=['GET', ], detail=False, permission_classes=[IsAuthenticated, ])
    def get_unread_messages_number(self, request):
        usr = User.objects.get(id=request.user.id)
        chats = None
        to_whom = ""
        if usr.is_customer:
            chats = Chat.objects.filter(customer_username=usr.username)
            to_whom = "customer"
        else:
            chats = Chat.objects.filter(vendor_username=usr.username)
            to_whom = "vendor"
        if not chats:
            return Response(data={"error":"there is no chat the user is involved"}, status=status.HTTP_202_ACCEPTED)
        chats_contents = ChatSerializer(chats, many=True)
        chats_contents = chats_contents.data
        chat_ids = []
        number = 0
            
        for chat_properties in chats_contents:
            chat_ids.append(chat_properties['id'])
        for chat_id in chat_ids:
            number = number + len(UnreadMessages.objects.filter(chat_id=chat_id, to_whom=to_whom))

        return Response(data=number , status=status.HTTP_200_OK)
   


    @swagger_auto_schema(method='delete', responses={status.HTTP_200_OK: SuccessSerializer, status.HTTP_202_ACCEPTED: ErrorSerializer})
    @action(methods=['DELETE', ], detail=False, permission_classes=[IsAuthenticated, ])
    def delete_chat(self, request):
        chat_id = request.data.get("chat_id")
        usr = User.objects.get(id=request.user.id)
        if not usr.is_customer:
            return Response(data={"error":"Only customers can delete a chat"}, status=status.HTTP_202_ACCEPTED)
        chat = is_found_a_chat(chat_id, usr)
        if chat == None:
            return Response(data={"error":"The chat does not exists or there is no such chat the user is allowed to delete"}, status=status.HTTP_202_ACCEPTED)
        try:
            chat.delete()
        except:
            return Response(data={"error":"The chat is not deleted"}, status=status.HTTP_200_OK)
        return Response(data={"success":"True"}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='delete', responses={status.HTTP_200_OK: SuccessSerializer, status.HTTP_202_ACCEPTED: ErrorSerializer})
    @action(methods=['DELETE', ], detail=False, permission_classes=[IsAuthenticated, ])
    def delete_message(self, request):
        message_id = request.data.get("message_id")
        chat_id = request.data.get("chat_id")
        user_id = request.user.id
        usr = User.objects.get(id=user_id)
        message = Message.objects.filter(whose_message=usr.is_customer,id=message_id,chat_id=chat_id)
        if not message:
            return Response(data={"error": "chat id or message id is not correct"}, status=status.HTTP_202_ACCEPTED)
        try:
            message.delete()
        except:
            return Response(data={"error":"The message is not deleted"}, status=status.HTTP_202_ACCEPTED)
        return Response(data={"success":"True"}, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()