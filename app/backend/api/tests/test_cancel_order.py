from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..views.orders_details import vendor_cancel_purchase
from ..models import Category, SubCategory, Vendor, Product, Purchase, Customer, Order
from django.contrib.auth import get_user_model

vendor_user = None
purchase_id = None
price = 100
discount = 5
stock = 5
amount = 2

class CancelOrderTest(TestCase):
    def setUp(self):
        global price, discount, stock, amount, vendor_user, purchase_id

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
        order = Order.objects.create(customer=customer)
        unit_price = price*(1-discount/100)
        purchase = Purchase.objects.create(customer=customer, vendor=vendor, product=product, amount=amount, 
                                            unit_price=unit_price, order=order, status='OrderTaken')
        purchase_id = purchase.id

    def test_cancel_order(self):
        global vendor_user, purchase_id

        content = AuthUserSerializer(vendor_user).data
        auth_token = content['auth_token']

        body = {
            'purchase_id' : purchase_id
        }

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post(reverse(vendor_cancel_purchase), body, 'json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['success'], 'Purchase is successfully canceled.')
