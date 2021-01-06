import json
from ..models import TempUser
from rest_framework import status
from rest_framework.test import APITestCase
class RegistrationTestCase(APITestCase):
    def test_registration(self):
        data = {
            "email" : "mrvyldm2@mailpoof.com",
            "username" : "merveusername",
            "first_name": "merve",
            "last_name": "yildirim",
            "password" : "Sifre123",
            "is_customer": False,
            "is_vendor": True,
            "address": "Muglak Cad. Osmaniye Sok. No:22 D:7 Kazancı/Ankara"
        }
        response = self.client.post("api/auth/register/",data)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(response.data['success'], 'user_info is created')
        temp_user = TempUser.objects.filter(email=email)
        is_present = False
        if temp_user:
            is_present = True
        self.assertTrue(is_present)