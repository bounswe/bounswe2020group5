from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Admin, Comment, User

class AdminDeleteUserByCommentIdTest(TestCase):

    def test_admin_delete_user_comment_id(self):
        admin_user = Admin.objects.get(email="bupazar451@gmail.com")
        content = AuthUserSerializer(admin_user).data
        auth_token = content['auth_token']
        body = {
            "comment_id": 51
        }
        comment = Comment.objects.get(id=51)
        customer = comment.customer
        email = customer.email
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post("/api/admin/delete_comment/",body)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['success'], True)
        is_found = False
        if User.objects.filter(email=email):
            is_found = True
        self.assertFalse(is_present)