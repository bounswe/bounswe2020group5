from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Category, SubCategory, Vendor, Product
from django.contrib.auth import get_user_model
from ..views import set_price_alarm

customer_user = None
product_id = None
price = 200
price_below = 150
stock = 7
discount = 5

"""
Unit test for setting price alarm to notify if price of product goes down to set price.
"""
class SetPriceAlarmTest(TestCase):
    def setUp(self):
        global product_id, price, stock, discount

        self.client = APIClient()
        category = Category.objects.create(name='category_test')
        subcategory = SubCategory.objects.create(name='subcategory_test', category=category)
        vendor_user = get_user_model().objects.create_user(username='yusufy', email='yusufy@hotmail.com', password='Sifre123',
                                    first_name='Yusuf', last_name='Yuksel', is_vendor=True, address='Kucukcekmece')
        vendor = Vendor.objects.create(user=vendor_user)
        product = Product.objects.create(name='TestProduct', price=price, stock=stock, description='Test Description', 
                                        subcategory=subcategory, vendor=vendor, brand='TestBrand', discount=discount)
        customer_user = get_user_model().objects.create_user(username='ismets', email='ismets@hotmail.com', password='Sifre123',
                                    first_name='Ismet', last_name='Sari', is_customer=True, address='Sirinevler')
        
        product_id = product.id

    def test_set_price_alarm(self):
        global customer_user, product_id, price_below

        content = AuthUserSerializer(customer_user).data
        auth_token = content['auth_token']

        body = {
            'product_id' : product_id,
            'price' : price_below
        }

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post(reverse(set_price_alarm), body, 'json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['success'], 'Alarm is successfully set.')
