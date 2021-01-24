from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..views.products_filter import sort_products
from ..models import Product
from django.db.models import Q
from ..serializers import ProductSerializer

product_ids = [67, 68, 69, 70, 71, 72, 73]

class SortProductTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_sort_product(self):
        body = {
            'product_ids' : product_ids,
            'sort_by': 'price',
            'order' : 'descending'
        }

        Products = Product.objects.all()
        Q_filter = Q()
        for product_id in product_ids:
            Q_filter |= Q(id=product_id)
        Products = Products.filter(Q_filter)
        Products = Products.order_by('-price')
        content = ProductSerializer(Products, many=True)

        response = self.client.post(reverse(sort_products), body, 'json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, content.data)
        