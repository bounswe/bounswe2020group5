import json
from ..models import TempUser, User
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.test import APITestCase
class RegistrationActivateTestCase(APITestCase):

    def setUp(self):

        self.client = APIClient()
        TempUser.objects.create(username='test_TempUser', email='mrvyldm2@mailpoof.com', password='Sifre123',
                                    first_name='mrvyldm2', last_name='mrvyldm2_Lase', is_vendor=False, address='Istanbul',number=123456)

    def test_registration_activate(self):
        data = {
            "email" : "mrvyldm2@mailpoof.com",
            "number" : "123456"
        }

        response = self.client.post("/api/auth/register_activate/",data)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        temp_user = TempUser.objects.filter(email=data['email'])
        
        is_present = False
        if temp_user:
            is_present = True
        self.assertFalse(is_present)

        user = User.objects.filter(email=data['email'])
        is_present_User_List = False
        if user:
            is_present_User_List = True
        self.assertTrue(is_present_User_List)