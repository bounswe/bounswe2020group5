from django.db import models
import json
from .users import Customer
from .products import Product

class FavoriteList(models.Model):
    products = models.ManyToManyField(Product)
    user = models.OneToOneField(Customer, on_delete=models.CASCADE, primary_key=True)

