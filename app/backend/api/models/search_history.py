from django.db import models
from .users import User
from .products import Product

# Search history table for a authenticated user
class SearchHistory(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, primary_key=True)
    products = models.ManyToManyField(Product)
