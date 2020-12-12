from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import User, TempUser
from ..serializers import UserSerializer, AuthUserSerializer
from ..serializers import LoginSerializer, EmptySerializer, RegisterSerializer, PasswordChangeSerializer
from ..serializers import UpdateProfileSerializer, SuccessSerializer, RegisterActivateSerializer
from ..utils import create_user_account, create_temp_user_account
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

usr = get_user_model()

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'login': LoginSerializer,
        'logout': EmptySerializer,
        'register': RegisterSerializer, 
        'password_change': PasswordChangeSerializer,
        'user_info' : EmptySerializer,
        'profile_update': UpdateProfileSerializer, 
        'register_activate': RegisterActivateSerializer, 
    }

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: AuthUserSerializer})
    @action(methods=['POST', ], detail=False)
    def login(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if email is None or password is None:
            return Response({'error': 'Please provide both email and password'},
                        status=HTTP_400_BAD_REQUEST)
        user = authenticate(request, username=email, password=password)
 
        if not user:
            return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)

        data = AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def logout(self, request):
        request.user.auth_token.delete()
        data = {'success': 'Successfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST', ], detail=False)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        if 'address' not in validated:
            validated['address'] = ""
        
        number = randint(10000, 99999)

        template = render_to_string('email_template.html', {'name': validated['username'], 'number': str(number)})
        index = 0
        while index < 5:
            try:
                #send_mail("Complete your signing up", template , "bupazar451@gmail.com", [validated['email']])
                send_mail("Complete your signing up", template , "bupazar451@gmail.com", ["sarismet2825@gmail.com"])
                break
            except:
                index+=1
        
        if index == 5:
            return Response(data={'error': 'The parameters are in wrong format or typed inaccurate'}, status=HTTP_400_BAD_REQUEST)
        
        user_info = create_temp_user_account(**validated,number=number)
        
        return Response(data = {"success": "user_info is created"}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: AuthUserSerializer})
    @action(methods=['POST', ], detail=False)
    def register_activate(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_user_email = serializer.validated_data['email']
        
        number = request.data.get("number")

        datas = TempUser.objects.filter(email=validated_user_email,number=number)

        validated_user_account = datas.values()[0]

        if (validated_user_account.pop('number') != number):
            return Response(data={'error': 'The number does not match'}, status=HTTP_400_BAD_REQUEST)

        datas.delete()
        
        user = create_user_account(**validated_user_account)
        data = AuthUserSerializer(user).data

        return Response(data=data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer})   
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthenticated, ])
    def password_change(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(data={'success': 'Successfully changed password'}, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthenticated, ])
    def profile_update(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if len(data) == 0:
            return Response(data={'success': 'Nothing to update'}, status=status.HTTP_200_OK)
        if 'email' in data:
            request.user.email = data['email']
        if 'username' in data:
            request.user.username = data['username']
        if 'first_name' in data:
            request.user.first_name = data['first_name']
        if 'last_name' in data:
            request.user.last_name = data['last_name']
        if 'address' in data:
            request.user.address = data['address']
        request.user.save()
        return Response(data={'success': 'Successfully updated profile'}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: UserSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthenticated, ])
    def user_info(self, request):
        data = UserSerializer(request.user).data
        return Response(data=data, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()