from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Admin
from django.contrib.auth import get_user_model

customer_user = None

class IsAdminTest(TestCase):

    def test_id_admin(self):
        
        admin_user = Admin.objects.get(email="bupazar451@gmail.com")

        content = AuthUserSerializer(admin_user).data
        auth_token = content['auth_token']

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post(reverse('credit-cards/opts-add'), body, 'json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['success'], 'Credit card is successfully added')


