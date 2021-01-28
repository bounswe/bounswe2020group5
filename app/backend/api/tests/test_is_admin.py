from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Admin, User
from django.contrib.auth import get_user_model

customer_user = None

class IsAdminTest(TestCase):

    def setUp(self):

        self.client = APIClient()
        admin = Admin(email="bupazar451@gmail.com",username="admin")
        admin.save()
        User.objects.create(email="bupazar451@gmail.com",username="admin",first_name="admin",last_name="adminl",is_customer=False)
        
    def test_is_admin(self):
        
        usr = User.objects.get(email="bupazar451@gmail.com")
        content = AuthUserSerializer(usr).data
        auth_token = content['auth_token']

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.get("/api/admin/is_admin/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['is_it_admin'], True)


