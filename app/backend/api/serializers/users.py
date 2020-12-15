from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth import password_validation
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from ..models.users import User
from ..models.temp_users import TempUser
from rest_framework.authtoken.models import Token
from rest_framework import serializers

usr = get_user_model()

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'is_customer', 'is_vendor', 'is_active', 'is_staff', 'address']

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


class RegisterActivateSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    number = serializers.CharField(required=True)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = usr
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'is_customer', 'is_vendor', 'address']
    
    def validate_email(self, value):
        user = usr.objects.filter(email=value)
        if user:
            raise serializers.ValidationError("Email is already taken")
        return BaseUserManager.normalize_email(value)

    def validate_username(self, value):
        user = usr.objects.filter(username=value)
        if user:
            raise serializers.ValidationError("Username is already taken")
        return AbstractBaseUser.normalize_username(value)

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError('Current password does not match')
        return value

    def validate_new_password(self, value):
        password_validation.validate_password(value)
        return value

class UpdateProfileSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=200, required=False)
    username = serializers.CharField(max_length=200, required=False)
    first_name = serializers.CharField(max_length=200, required=False)
    last_name = serializers.CharField(max_length=200, required=False)
    address = serializers.CharField(max_length=500, required=False)

    def validate_email(self, value):
        user = usr.objects.filter(email=value)
        if user:
            raise serializers.ValidationError("Email is already taken")
        return BaseUserManager.normalize_email(value)

    def validate_username(self, value):
        user = usr.objects.filter(username=value)
        if user:
            raise serializers.ValidationError("Username is already taken")
        return AbstractBaseUser.normalize_username(value)


class PasswordResetRequestEmailSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=200, required=False)

    class Meta:
        fields = ['email']

    def validate_email(self, value):
        user = usr.objects.filter(email=value)
        if not user:
            raise serializers.ValidationError("Email is not registered")
        return BaseUserManager.normalize_email(value)

class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(max_length=200, required=False)
    new_password_again = serializers.CharField(max_length=200, required=False)

    def validate(self, attrs):
        new_password = attrs.get('new_password', '')
        new_password_again = attrs.get('new_password_again', '')

        if new_password != new_password_again:
            raise serializers.ValidationError("passwords do not match")
        password_validation.validate_password(new_password)
        return super().validate(attrs)


class SuccessSerializer(serializers.Serializer):
    success = serializers.CharField(max_length=200)

class ErrorSerializer(serializers.Serializer):
    error = serializers.CharField(max_length=200)
