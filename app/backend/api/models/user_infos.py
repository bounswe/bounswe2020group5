from django.db import models

class Info(models.Model):

    number = models.CharField(max_length=250)
    username = models.CharField(max_length=200, unique=True) 
    email = models.CharField(max_length=200, unique=True) 
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_customer = models.BooleanField(default=False)
    is_vendor = models.BooleanField(default=False)
    address = models.TextField(default='')
    password = models.CharField(max_length=250)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name'] 
    def __str__(self): 
        return self.email


