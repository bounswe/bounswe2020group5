from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..views.products_filter import filter_products
from ..models import Product
from django.db.models import Q
from ..serializers import ProductSerializer

product_ids = [67, 68, 69, 70, 71, 72, 73]
lower_limit = 500
upper_limit = 10000

class FilterProductTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_filter_product(self):
        body = {
            'product_ids' : product_ids,
            'filter_data' : [
                {
                    'filter_by' : 'price_range', 
                    'data' : {
                        'lower_limit' : lower_limit,
                        'upper_limit' : upper_limit,
                    }
                }
            ]
        }

        Products = Product.objects.all()
        Q_filter = Q()
        for product_id in product_ids:
            Q_filter |= Q(id=product_id)
        Products = Products.filter(Q_filter)
        Products = Products.filter(price__range=(lower_limit, upper_limit))
        content = ProductSerializer(Products, many=True)

        response = self.client.post(reverse(filter_products), body, 'json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, content.data)
