from rest_framework import serializers
from ..models import UserInfo
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

#Info Serializer
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'

class RegisterUserInfoCheckSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    number = serializers.CharField(required=True)

    def validate_email(self,value):
        user = UserInfo.objects.filter(email=value)
        if not user:
            raise serializers.ValidationError("Email is not found")
        return BaseUserManager.normalize_email(value)
    
    