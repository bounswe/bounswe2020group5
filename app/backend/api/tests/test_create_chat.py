import json
from ..models import TempUser, User, Chat
from rest_framework import status
from rest_framework.test import APITestCase
class CreateChatTestCase(APITestCase):
    def test_create_chat(self):
        usr = User.objects.get(email="mrvyldm2@mailpoof.com")
        content = AuthUserSerializer(usr).data
        auth_token = content['auth_token']
        body = {
            "vendor_username" : "ncpdag",            
            "product_id": 67
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        chat = Chat.objects.filter(vendor_username="ncpdag",product_id=product_id)
        is_found = False
        if chat:
            is_found = True
        self.assertFalse(is_found)
        response = self.client.post("/api/chats/create_chat/",body)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        chat = Chat.objects.filter(vendor_username="ncpdag",product_id=product_id)
        if chat:
            is_found = True
        self.assertTrue(is_found)
        self.assertEqual(chat.vendor_username,"ncpdag")