from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer, PriceAlarmSerializer
from ..models import Category, SubCategory, Vendor, Product, Customer, PriceAlarm
from django.contrib.auth import get_user_model
from ..views import my_price_alarms

customer = None
customer_user = None
price_alarm = None
price = 200
price_below = 150
stock = 7
discount = 5

"""
Unit test for getting price alarms of authenticated customers.
"""
class MyPriceAlarmTest(TestCase):
    def setUp(self):
        global price, stock, discount, price_below, customer_user, price_alarm, customer

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
        customer = Customer.objects.create(user=customer_user)
        price_alarm = PriceAlarm.objects.create(customer=customer, product=product, price=price_below)

    def test_my_price_alarms(self):
        global customer_user, price_alarm, customer

        price_alarms = PriceAlarmSerializer(PriceAlarm.objects.filter(customer = customer), many=True)
        content = AuthUserSerializer(customer_user).data
        auth_token = content['auth_token']

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.get(reverse(my_price_alarms))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, price_alarms.data)
