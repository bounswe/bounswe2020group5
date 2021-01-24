from django.db import models

class Admin(models.Model):
    username = models.CharField(max_length=200, unique=True) 
    email = models.CharField(max_length=200, unique=True)