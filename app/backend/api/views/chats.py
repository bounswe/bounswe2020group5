from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import Message, Chat, User
from ..serializers import MessageSerializer, ChatSerializer, ChatCreateSerializer, SuccessSerializer, SendMessageSerializer
from ..utils import create_user_account, create_temp_user_account, send_email, create_chat, create_message
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
        'send_message': SendMessageSerializer
    }
    

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def create_chat(self, request):
        customer_id = request.user.id
        vendor_id = request.data.get("vendor_id")
        context = request.data.get("context")
        vendor = User.objects.filter(id=vendor_id)
        if not vendor:
            return Response(data={'error': 'There is not such vendor with that id'}, status=HTTP_400_BAD_REQUEST)
        chat = create_chat(customer_id, vendor_id)
        message = create_message(context,chat)
        return Response(data={"success":"conversation is created. Happy chatting"}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def send_message(self, request):
        chat_id = request.data.get("chat_id")
        context = request.data.get("context")
        chat = Chat.objects.get(id=chat_id)
        if not chat:
            return Response(data={'error': 'There is not such chat with that id'}, status=HTTP_400_BAD_REQUEST)
        print("chat is ", chat)
        try:
            message = create_message(context,chat)
        except:
            return Response(data={'error': 'the messages is not sent'}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"success":"message is sent."}, status=status.HTTP_200_OK)
   


    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()