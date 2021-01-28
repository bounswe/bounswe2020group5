from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import BannedUser, User

class BlockUserTest(TestCase):

    def setUp(self):

        self.client = APIClient()
        u = User.objects.create(email="sarismet2825@gmail.com",username="sarismet2825",password="password",first_name="ismet",last_name="sari",is_customer=False)
        u.save()

    def test_block_user(self):
        body = {
            "email": "sarismet2825@gmail.com",
            "password": "thereisnosuchpassword"
        }
        self.client.post("/api/auth/login/",body)
        self.client.post("/api/auth/login/",body)
        self.client.post("/api/auth/login/",body)
        is_found = False
        if BannedUser.objects.filter(email="sarismet2825@gmail.com"):
            is_found = True
        self.assertTrue(is_found)