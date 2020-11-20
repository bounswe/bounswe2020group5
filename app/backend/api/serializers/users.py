from django.contrib.auth import get_user_model
from ..models.users import User
from rest_framework.authtoken.models import Token
from rest_framework import serializers

usr = get_user_model()

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=200, required=True)
    password = serializers.CharField(max_length=128, required=True, write_only=True)

class AuthUserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = usr
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'is_customer', 'is_vendor', 'is_active', 'is_staff', 'address', 'auth_token']
        read_only_fields = ['id', 'is_active', 'is_staff']

    def get_auth_token(self, obj):
        token, dummy = Token.objects.get_or_create(user=obj)
        return token.key        
    
class EmptySerializer(serializers.Serializer):
    pass