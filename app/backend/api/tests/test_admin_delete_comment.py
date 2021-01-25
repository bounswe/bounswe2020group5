from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Admin

class AdminDeleteCommentTest(TestCase):

    def test_admin_delete_comment(self):
        admin_user = Admin.objects.get(email="bupazar451@gmail.com")
        content = AuthUserSerializer(admin_user).data
        auth_token = content['auth_token']
        body = {
            "comment_id": 51
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post("/api/admin/delete_comment/",body)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['success'], 'comment is deleted')
        is_found = False
        if Comment.objects.filter(id=51):
            is_found = True
        self.assertFalse(is_found)
