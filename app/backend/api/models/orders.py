from django.db import models
from .users import Customer

class CreditCard(models.Model):
    name = models.CharField(default='my credit card', max_length=50)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    card_owner = models.CharField(max_length=250)
    card_number = models.CharField(max_length=16)
    expiration_date = models.CharField(max_length=5)
    cvc_security_number = models.IntegerField()
