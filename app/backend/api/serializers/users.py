from django.contrib.auth.models import User
from rest_framework import serializers

#TODO: User Serializer will be populated.
#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']