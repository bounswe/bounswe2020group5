import json
from ..models import TempUser, User
from rest_framework import status
from rest_framework.test import APITestCase
class RegistrationActivateTestCase(APITestCase):
    def test_registration_activate(self):
        data = {
            "email" : "mrvyldm2@mailpoof.com",
            "number" : "154835"
        }
        response = self.client.post("api/auth/register_activate/",data)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        temp_user = TempUser.objects.filter(email=email)
        
        is_present = False
        if temp_user:
            is_present = True
        self.assertFalse(is_present)

        user = User.objects.filter(email=email)
        is_present_User_List = False
        if user:
            is_present_User_List = True
        self.assertTrue(is_present_User_List)