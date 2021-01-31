from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..views.orders_details import vendor_update_status
from ..models import Category, SubCategory, Vendor, Product, Purchase, Customer, Order
from django.contrib.auth import get_user_model

vendor_user = None
purchase_id = None
price = 250
discount = 15
stock = 50
amount = 1

class UpdateStatusTest(TestCase):
    def setUp(self):
        global price, discount, stock, amount, vendor_user, purchase_id

        self.client = APIClient()
        category = Category.objects.create(name='category_test')
        subcategory = SubCategory.objects.create(name='subcategory_test', category=category)
        vendor_user = get_user_model().objects.create_user(username='test_vendor', email='testvendor@test.com', password='Sifre123',
                                    first_name='Vendor', last_name='Test', is_vendor=True, address='Istanbul')
        vendor = Vendor.objects.create(user=vendor_user)
        product = Product.objects.create(name='Test Product', price=price, stock=stock, description='Test Description', 
                                        subcategory=subcategory, vendor=vendor, brand='TestBrand', discount=discount)
        customer_user = get_user_model().objects.create_user(username='test_customer', email='testcustomer@test.com', password='Sifre123',
                                    first_name='Customer', last_name='Test', is_customer=True, address='Istanbul')
        customer = Customer.objects.create(user=customer_user)
        order = Order.objects.create(customer=customer)
        unit_price = price*(1-discount/100)
        purchase = Purchase.objects.create(customer=customer, vendor=vendor, product=product, amount=amount, 
                                            unit_price=unit_price, order=order, status='OrderTaken')
        purchase_id = purchase.id

    def test_update_status(self):
        global vendor_user, purchase_id

        content = AuthUserSerializer(vendor_user).data
        auth_token = content['auth_token']

        body = {
            'purchase_id' : purchase_id,
            'status' :  'Preparing'
        }

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post(reverse(vendor_update_status), body, 'json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['success'], 'Order status is successfully updated.')