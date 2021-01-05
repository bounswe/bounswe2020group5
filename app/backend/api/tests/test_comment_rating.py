from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import AuthUserSerializer
from ..models import Category, SubCategory, Vendor, Product, Purchase, Customer, Order
from django.contrib.auth import get_user_model

customer_user = None
product_id = None
price = 250
discount = 15
stock = 50
amount = 1

class CommentRatingTest(TestCase):
    def setUp(self):
        global price, discount, stock, amount, customer_user, product_id

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
        product_id = product.id

    def test_update_status(self):
        global customer_user, product_id

        content = AuthUserSerializer(customer_user).data
        auth_token = content['auth_token']

        body = {
            'product_id' : product_id,
            'comment_text' : 'Test Comment',
            'is_anonymous ' : True,
            'rating_score' : 4
        }

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post(reverse('products/opts-add_comment'), body, 'json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['success'], 'Comment added, Rating is given')