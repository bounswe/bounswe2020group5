from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from ..views.products_filter import search_products
from django.db.models import Q
from ..models import Product
from ..serializers import ProductSerializer

query = 'Notebook'

class SearchProductTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_search_product(self):
        body = {
            'query' : query
        }

        Products = Product.objects.all()
        Q_filter = Q(name__icontains='notebook') | Q(description__icontains='notebook') | Q(name__icontains='laptop') | Q(description__icontains='laptop')
        Products = Products.filter(Q_filter)
        content = ProductSerializer(Products, many=True)

        response = self.client.post(reverse(search_products), body, 'json')
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 0)
        self.assertEqual(response.data, content.data)
