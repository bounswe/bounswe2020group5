from rest_framework import serializers
from ..models import Info
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

#Info Serializer
class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'

class RegisterInfoCheckSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    number = serializers.CharField(required=True)

    def validate_email(self,value):
        user = Info.objects.filter(email=value)
        if not user:
            raise serializers.ValidationError("Email is not found")
        return BaseUserManager.normalize_email(value)
    
    