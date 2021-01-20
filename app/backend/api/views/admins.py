from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import Admin, Comment, User
from ..serializers import AdminSerializer, IsAdminResponseSerializer, AssignSerializer, CommentIdSerializer, EmptySerializer, SuccessSerializer, ErrorSerializer
from rest_framework import serializers
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from drf_yasg.utils import swagger_auto_schema

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
)

from drf_yasg.utils import swagger_auto_schema

#View set for admin users. We keep all the endpoints for admin here.
class AdminViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'is_admin': EmptySerializer,
        'assign_admin': AssignSerializer,
        'delete_comment': CommentIdSerializer,
        'delete_user_by_comment_id' : CommentIdSerializer,
        'delete_user_by_id': AssignSerializer
    }

    #this enpoint says if a user is an admin or not.
    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: IsAdminResponseSerializer})
    @action(methods=['GET'], detail=False)
    def is_admin(self, request):
        is_found = False
        if Admin.objects.filter(username=request.user.username) :
            is_found = True
        return Response(data={"is_it_admin":is_found}, status=status.HTTP_200_OK)