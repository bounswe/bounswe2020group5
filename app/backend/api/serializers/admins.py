from rest_framework.authtoken.models import Token
from rest_framework import serializers
from ..models import Admin

#Admin Model Serializer
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ('id', 'email', 'username')

#is_admin endpoint returns a boolean
class IsAdminResponseSerializer(serializers.Serializer):
    is_it_admin = serializers.BooleanField()

#assign admin endpoint needs a username
class AssignSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
#delete comment and delete user with comment id endpoint need commenr id
class CommentIdSerializer(serializers.Serializer):
    comment_id = serializers.IntegerField(required=True)