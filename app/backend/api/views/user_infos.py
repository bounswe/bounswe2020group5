from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import Info
from ..serializers import UserInfoSerializer, RegisterSerializer, RegisterUserInfoCheckSerializer, AuthUserSerializer
from ..utils import create_user_info, create_user_account
from rest_framework import serializers
from django.core.mail import BadHeaderError, send_mail
from django.conf import settings
from django.template.loader import render_to_string
from random import randint
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from drf_yasg.utils import swagger_auto_schema

class UserInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Info.objects.all()
    serializer_class = UserInfoSerializer


class UserInfoOptViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'user_register': RegisterSerializer,
        'user_check_register': RegisterUserInfoCheckSerializer,
    }
    
    @action(methods=['POST', ], detail=False)
    def user_register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        if 'address' not in validated:
            validated['address'] = ""
        
        number = randint(10000, 99999)

        template = render_to_string('email_template.html',{'name':validated['username'],'number':str(number)})
        
        try:
            send_mail("Complete your signing up", template , "bupazar451@gmail.com", [validated['email']])
        except BadHeaderError:
            return Response(data="The parameters are in wrong format or typed inaccurate", status=HTTP_400_BAD_REQUEST)
        
        user_info = create_user_info(**validated,number=number)
        
        data = {"user_info":"user_info is created"}
        return Response(data=data, status=status.HTTP_201_CREATED)


    @action(methods=['POST', ], detail=False)
    def user_check_register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_user_email = serializer.validated_data['email']
        
        number = request.data.get("number")

        datas = Info.objects.filter(email=validated_user_email,number=number)

        validated_user_account = datas.values()[0]

        datas.delete()

        if (validated_user_account.pop('number') != number):
            return Response(data="The number does not match ", status=HTTP_400_BAD_REQUEST)
        
        user = create_user_account(**validated_user_account)
        data = AuthUserSerializer(user).data

        return Response(data=data, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()