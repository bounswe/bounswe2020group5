from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Admin, User

class AssignAdminTest(TestCase):


    def setUp(self):

        self.client = APIClient()
        a = Admin.objects.create(email="bupazar451@gmail.com",username="admin")
        a.save()
        ua = User.objects.create(email="bupazar451@gmail.com",username="admin",first_name="admin",last_name="adminl",is_customer=False)
        ua.save()
        u = User.objects.create(email="sarismet2825@gmail.com",username="sarismet2825",first_name="ismet",last_name="sari",is_customer=False)
        u.save()


    def test_assign_admin(self):
        asa = Admin.objects.get(email="bupazar451@gmail.com")
        admin_u = User.objects.get(email=asa.email)
        content = AuthUserSerializer(admin_u).data
        auth_token = content['auth_token']
        body = {
            "username": "sarismet2825"
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post("/api/admin/assign_admin/",body)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['success'], 'admin is assigned')
