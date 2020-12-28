from django.db import models
from .users import Customer, Vendor
from .products import Product

class CreditCard(models.Model):
    name = models.CharField(default='my credit card', max_length=50)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    card_owner = models.CharField(max_length=250)
    card_number = models.CharField(max_length=16, unique=True)
    expiration_date = models.CharField(max_length=5)
    cvc_security_number = models.CharField(max_length=3)

class Order(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    
class Purchase(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.IntegerField()
    unit_price = models.FloatField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    status = models.CharField(max_length=100)
