from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import User, TempUser, SocialUserDocuments
from ..serializers import UserSerializer, AuthUserSerializer, PasswordResetConfirmSerializer
from ..serializers import LoginSerializer, EmptySerializer, RegisterSerializer, PasswordChangeSerializer, GoogleSocialAuthSerializer
from ..serializers import UpdateProfileSerializer, SuccessSerializer, RegisterActivateSerializer, PasswordResetRequestEmailSerializer
from ..utils import create_user_account, create_temp_user_account, send_email
from rest_framework import serializers
from django.conf import settings
from django.template.loader import render_to_string
from random import randint
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from bupazar.settings import PASSWORD

from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_500_INTERNAL_SERVER_ERROR
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
        'password_reset_request' : PasswordResetRequestEmailSerializer,
        'password_reset_confirm' : PasswordResetConfirmSerializer,
        'google_login': GoogleSocialAuthSerializer,
    }

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: AuthUserSerializer})
    @action(methods=['POST', ], detail=False)
    def google_login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        data = dict(validated)['auth_token']
        email = data['email']
        username = data['given_name'] + "_" + data['family_name']
        first_name = data['given_name']
        last_name = data['family_name']
        user = None
        social_user = User.objects.filter(email = email)
        social_user_document = SocialUserDocuments.objects.filter(email=email,provider='google')
        if social_user and social_user_document:
            user = authenticate(request, username=email, password=PASSWORD)
            print("user is ",user)
        elif not social_user_document and social_user:
            return Response({'error': 'The user with this email is already registered.'},
                        status=HTTP_400_BAD_REQUEST)
        else:
            social_user_document = SocialUserDocuments(email=email,provider='google')
            social_user_document.save()
            user = create_user_account(email=email,username=username,first_name=first_name,last_name=last_name,password=PASSWORD,is_customer=True,is_vendor=False,address="Address is not defined in Google") 
        if user == None:
            return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
        data = AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_201_CREATED)

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

        is_found = TempUser.objects.filter(email=validated['email'])
        if is_found:
            is_found.delete()
        
        number = randint(100000, 999999)

        template = render_to_string('email_verification_template.html', {'name': validated['username'], 'number': str(number)})
        if send_email(template , validated['email']) == 5:
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

        is_found = User.objects.filter(email=validated_user_email)
        if is_found:
            return Response(data={'user': 'user is already registered'}, status=HTTP_400_BAD_REQUEST)

        the_user = TempUser.objects.filter(email=validated_user_email)
        if not the_user:
            return Response(data={'email': 'email is not found'}, status=HTTP_400_BAD_REQUEST)

        validated_user_account = the_user.values()[0]
        if (validated_user_account.pop('number') != number):
            return Response(data={'number': 'The number does not match'}, status=HTTP_400_BAD_REQUEST)

        user = create_user_account(**validated_user_account)
        the_user.delete()
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
    
    @action(methods=['POST'], detail=False)
    def password_reset_request(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = "api/auth/password_reset_confirm/?uidb64="+uidb64+";token="+token
            link = 'http://'+current_site +"/"+ relativeLink
            template = render_to_string('email_password_reset_template.html', {'name': user.username, 'link': link})
            send_email(template,email)
            data = {
                "uidb64" : uidb64,
                "token" : token,
                "current_site" : current_site,
                "relativeLink" : relativeLink,
                "template" : template
            } 
    
        return Response(data=data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: AuthUserSerializer})
    @action(methods=['POST'], detail=False)
    def password_reset_confirm(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data

        uidb64 = request.query_params['uidb64']
        token = request.query_params['token']
        password = validated['new_password']
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if user.password == password:
                return Response({'error': 'new password is the same as the older version. Please enter different password from the pervious one.'}, status=status.HTTP_400_BAD_REQUEST)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(password)
            user.save()
            data = AuthUserSerializer(user).data
            return Response(data=data, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return Response({'error': 'user does not have this token'}, status=status.HTTP_400_BAD_REQUEST)
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)
                
        return Response(data=data, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
