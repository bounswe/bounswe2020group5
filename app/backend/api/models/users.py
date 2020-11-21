from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser): 
    username = models.CharField(max_length=200, unique=True) 
    email = models.CharField(max_length=200, unique=True) 
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_customer = models.BooleanField(default=False)
    is_vendor = models.BooleanField(default=False)
    address = models.TextField(default='')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name'] 
    def __str__(self): 
        return self.email

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key = True)

class Vendor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key = True)