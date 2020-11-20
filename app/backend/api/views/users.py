from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import User
from ..serializers import UserSerializer, AuthUserSerializer, LoginSerializer, EmptySerializer, RegisterSerializer
from ..utils import create_user_account
from rest_framework import serializers
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

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
    }

    @action(methods=['POST', ], detail=False)
    def login(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if email is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
        user = authenticate(request, username=email, password=password)
 
        if not user:
            return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)

        data = AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_200_OK)
    
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthenticated, ])
    def logout(self, request):
        request.user.auth_token.delete()
        data = {'success': 'Sucessfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['POST', ], detail=False)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = create_user_account(**serializer.validated_data)
        data = AuthUserSerializer(user).data
        return Response(data=data, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()