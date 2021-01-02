from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import ProductSerializer, AuthUserSerializer
from ..views.products_details import product_detail 
from ..models import Category, SubCategory, Vendor, Product
from django.contrib.auth import get_user_model

user = None
product_id = None
price = 200
stock = 7

class UpdateProductTest(TestCase):
    def setUp(self):
        global product_id, user

        self.client = APIClient()
        category = Category.objects.create(name='category_test')
        subcategory = SubCategory.objects.create(name='subcategory_test', category=category)
        user = get_user_model().objects.create_user(username='yusufy', email='yusufy@hotmail.com', password='Sifre123',
                                    first_name='Yusuf', last_name='Yuksel', is_vendor=True, address='Kucukcekmece')
        vendor = Vendor.objects.create(user=user)
        product = Product.objects.create(name='TestProduct', price=100, stock=5, description='Test Description', 
                                        subcategory=subcategory, vendor=vendor, brand='TestBrand', discount=5)
        product_id = product.id

    def test_update_product(self):
        global user, product_id, price, stock

        content = AuthUserSerializer(user).data
        auth_token = content['auth_token']

        body = {
            'product_id' : product_id,
            'price' : price,
            'stock' : stock
        }

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post(reverse('products/opts-update_product'), body, 'json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['success'], 'Successfully updated product')
