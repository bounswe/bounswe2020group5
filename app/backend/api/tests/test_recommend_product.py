from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..views.products_filter import search_products
from ..views.recommendation import recommend_products
from ..views.products_details import get_homepage_products
from django.contrib.auth import get_user_model
from ..serializers import AuthUserSerializer, ProductSerializer
from ..models import Customer

customer = None
query = 'Notebook'
number_of_products = 15

"""
Unit Test for recommend product endpoint,
Based on authenticated customer
"""
class RecommendProductTest(TestCase):
    def setUp(self):
        global customer

        self.client = APIClient()
        customer = get_user_model().objects.create_user(username='yusufy', email='yusufy@hotmail.com', password='Sifre123',
                                    first_name='Yusuf', last_name='Yuksel', is_customer=True, address='Kucukcekmece')
        customer_user = Customer.objects.create(user=customer)

    def test_recommend_product(self):
        global customer, number_of_products, query

        body = {
            'query' : query
        }

        content = AuthUserSerializer(customer).data
        auth_token = content['auth_token']

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        search_response = self.client.post(reverse(search_products), body, 'json')

        body = {
            'number_of_products' : number_of_products
        }  

        homepage_response = self.client.post(reverse(get_homepage_products), body, 'json')
        homepage_response = homepage_response.data 
        best_sellers = homepage_response['best_sellers']  

        recommend_response = self.client.get(reverse(recommend_products))

        products = []
        for product in search_response.data:
            products.append(product)

        if len(products) < number_of_products:
            diff = number_of_products - len(products)
            products_difference = best_sellers[:diff]

            for product in products_difference:
                if product not in products:
                    products.append(product)
        
        content = ProductSerializer(products, many=True)
        self.assertEqual(recommend_response.status_code, 200)
        self.assertEqual(recommend_response.data, content.data)
