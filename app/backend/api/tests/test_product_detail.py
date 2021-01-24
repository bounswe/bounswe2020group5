from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..serializers import ProductSerializer
from ..views.products_details import product_detail 
from ..models import Category, SubCategory, User, Vendor, Product

product_id = None

class ProductDetailTest(TestCase):
    def setUp(self):
        global product_id

        self.client = APIClient()
        category = Category.objects.create(name='category_test')
        subcategory = SubCategory.objects.create(name='subcategory_test', category=category)
        user = User.objects.create(username='yusufy', email='yusufy@hotmail.com', 
                                    first_name='Yusuf', last_name='Yuksel', is_vendor=True, address='Kucukcekmece')
        vendor = Vendor.objects.create(user=user)
        product = Product.objects.create(name='TestProduct', price=100, stock=5, description='Test Description', 
                                        subcategory=subcategory, vendor=vendor, brand='TestBrand', discount=5)
        product_id = product.id
        
    def test_product_detail(self):
        global product_id

        product = Product.objects.get(id=product_id)
        content = ProductSerializer(product)
        response = self.client.get(reverse(product_detail, args =[product_id]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, content.data)
