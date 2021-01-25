from django.contrib.auth import get_user_model, authenticate
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import Admin, Comment, User
from api.custom_permissions import IsAuthAdmin
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
    permission_classes = [AllowAny, IsAuthAdmin]
    serializer_classes = {
        'is_admin': EmptySerializer,
        'assign_admin': AssignSerializer,
        'delete_comment': CommentIdSerializer,
        'delete_user_by_comment_id' : CommentIdSerializer,
        'delete_user_by_username': AssignSerializer
    }

    #this enpoint says if a user is an admin or not.
    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: IsAdminResponseSerializer})
    @action(methods=['GET'], detail=False, permission_classes=[IsAuthenticated, ])
    def is_admin(self, request):
        is_found = False
        if Admin.objects.filter(username=request.user.username) :
            is_found = True
        return Response(data={"is_it_admin":is_found}, status=status.HTTP_200_OK)

    #this endpoint gives a random user an admin capability.
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer, status.HTTP_400_BAD_REQUEST: ErrorSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthAdmin, ])
    def assign_admin(self, request):
        username = request.data.get("username")
        #first we take the admin with that username and if it is not exist we return an error since the user who send the request is not an admin
        if not Admin.objects.filter(username=request.user.username) :
            return Response(data={'error': 'You are not authorized to assign a user admin mode'}, status=status.HTTP_400_BAD_REQUEST)
        #then check if the user that we intend to assign an admin mode is already an admin or not
        if Admin.objects.filter(username=username):
            return Response(data={'error': 'the user is already admin'}, status=status.HTTP_400_BAD_REQUEST)
        #If it is suitable to be an admin we get the user
        try:
            usr_to_assign = User.objects.get(username=username)
        except:
            return Response(data={'error': 'the user not found with that username'}, status=status.HTTP_400_BAD_REQUEST)
        a = Admin(email=usr_to_assign.email, username=username)
        a.save()#give him or her an admin mode
        return Response(data={"success":"admin is assigned"}, status=status.HTTP_201_CREATED)

    #this endpoint delete a comment
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer, status.HTTP_400_BAD_REQUEST: ErrorSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthAdmin, ])
    def delete_comment(self, request):
        comment_id = request.data.get("comment_id")
        #first we take the admin with that username and if it is not exist we return an error since the user who send the request is not an admin
        if not Admin.objects.filter(username=request.user.username):
            return Response(data={'error': 'the user is not admin'}, status=status.HTTP_400_BAD_REQUEST)
        is_found = Comment.objects.filter(id=comment_id)# we try to get the comment here with id.
        if not is_found:#if it is not found we return an error.
            return Response(data={'error': 'Comment is not found with that id'}, status=status.HTTP_400_BAD_REQUEST)
        is_found.delete()#deleting the comment
        return Response(data={"success":"comment is deleted"}, status=status.HTTP_201_CREATED)

    #this endpoint delete a user by finding the user with a comment id
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer, status.HTTP_400_BAD_REQUEST: ErrorSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthAdmin, ])
    def delete_user_by_comment_id(self, request):
        comment_id = request.data.get("comment_id")
        #first we take the admin with that username and if it is not exist we return an error since the user who send the request is not an admin
        if not Admin.objects.filter(username=request.user.username):
            return Response(data={'error': 'the user is not admin'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            comment = Comment.objects.get(id=comment_id)#try to get the comment
        except:
            return Response(data={'error': 'Comment is not found with that id'}, status=status.HTTP_400_BAD_REQUEST)
        #getting the owner of the comment
        user_with_that_commnet_id = comment.customer
        #deleting
        user_with_that_commnet_id.delete()
        return Response(data={"success":"customer user is deleted"}, status=status.HTTP_201_CREATED)
        
    #this endpoint delete a user with just his or her id
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer, status.HTTP_400_BAD_REQUEST: ErrorSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthAdmin, ])
    def delete_user_by_username(self, request):
        username = request.data.get("username")
        #first we take the admin with that username and if it is not exist we return an error since the user who send the request is not an admin
        if not Admin.objects.filter(username=request.user.username):
            return Response(data={'error': 'the user is not admin'}, status=status.HTTP_400_BAD_REQUEST)
        #trying to get the user
        user = User.objects.filter(username=username)
        if not user: #if it is not found return an errror
            return Response(data={'error': 'the user not found with that id'}, status=status.HTTP_400_BAD_REQUEST)
        # deleting the user
        user.delete()
        return Response(data={"success":"customer user is assigned"}, status=status.HTTP_201_CREATED) 
        
    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()