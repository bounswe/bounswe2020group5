from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Customer
from django.contrib.auth import get_user_model

customer_user = None

class AddCreditCardTest(TestCase):
    def setUp(self):
        global customer_user

        self.client = APIClient()
        customer_user = get_user_model().objects.create_user(username='test_customer', email='testcustomer@test.com', password='Sifre123',
                                    first_name='Customer', last_name='Test', is_customer=True, address='Istanbul')
        customer = Customer.objects.create(user=customer_user)

    def test_update_status(self):
        global customer_user

        content = AuthUserSerializer(customer_user).data
        auth_token = content['auth_token']

        body = {
            'name' : 'My Test Credit Card',
            'card_owner' : 'Test Owner',
            'card_number' : '1212343456567878',
            'expiration_date' : '10/24',
            'cvc_security_number' : '123'
        }

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post(reverse('credit-cards/opts-add'), body, 'json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['success'], 'Credit card is successfully added')
