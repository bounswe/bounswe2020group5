from django.db import models
import json
from .products import Product

class FavoriteList(models.Model):
    products = models.ManyToManyField(Product)
    user = models.OneToOneField('Customer', on_delete=models.CASCADE, primary_key=True)

class Cart(models.Model):
    user = models.OneToOneField('Customer', on_delete=models.CASCADE, primary_key=True)
    
class ProductInCart(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    count = models.IntegerField()

    class Meta:
        unique_together = (('cart', 'product'),)




