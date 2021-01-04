import json
from ..models import TempUser, User
from rest_framework import status
from rest_framework.test import APITestCase
from bupazar.settings import G_CLIENT_ID
from google.auth.transport import requests
from google.oauth2 import id_token
class GoogleLoginTestCase(APITestCase):
    def test_google_login(self):
        data = {
            "auth_token" : G_CLIENT_ID
        }
        usr = id_token.verify_oauth2_token(
                auth_token, requests.Request())
        email = usr['auth_token']['email']
        response = self.client.post("/api/auth/google_login/",data)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        social_doc = SocialDocs.objects.filter(email=email,provider="google")
        is_found = False
        if social_doc:
            is_found = True
        self.assertTrue(is_found)
        user_id_db = User.objects.get(email=email)
        self.assertEqual(user_id_db.email,email)
        