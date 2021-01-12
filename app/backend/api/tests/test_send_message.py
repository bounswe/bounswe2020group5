import json
from ..models import TempUser, User, Chat, Message
from rest_framework import status
from rest_framework.test import APITestCase
class SendMessageFailTestCase(APITestCase):
    def test_send_message_fail(self):
        body = {
            "chat_id": "54000",
            "content": "This message is not in any chat"
        }
        usr = User.objects.get(email="mrvyldm2@mailpoof.com")
        content = AuthUserSerializer(usr).data
        auth_token = content['auth_token']
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post("/api/chats/send_message/",data)
        self.assertEqual(response.data['error'],"there is no such chat with that id or the user is not allowed get the chat history")


