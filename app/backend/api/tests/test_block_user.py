from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import BannedUser

class BlockUserTest(TestCase):
    def test_block_user(self):
        body = {
            "email": "sariismet2825@gmail.com",
            "password": "thereisnosuchpassword"
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        self.client.post("/api/auth/login/",body)
        self.client.post("/api/auth/login/",body)
        self.client.post("/api/auth/login/",body)
        is_found = False
        if BannedUser.objects.filter(email=email):
            is_found = True
        self.assertTrue(is_present)