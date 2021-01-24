from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Admin

class AssignAdminTest(TestCase):

    def test_assign_admin(self):
        admin_user = Admin.objects.get(email="bupazar451@gmail.com")
        content = AuthUserSerializer(admin_user).data
        auth_token = content['auth_token']
        body = {
            "username": "sariismet2825@gmail.com"
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post("/api/admin/assign_admin/",body)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['success'], 'admin is assigned')
