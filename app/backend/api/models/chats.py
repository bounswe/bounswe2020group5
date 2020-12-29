from django.db import models
from django_unixdatetimefield import UnixDateTimeField

class Chat(models.Model):
    vendor_username = models.CharField(max_length=250)
    customer_username = models.CharField(max_length=250)
    product_id = models.IntegerField()
    time = UnixDateTimeField()

class Message(models.Model):
    content = models.CharField(max_length=250)
    time = UnixDateTimeField()
    whose_message = models.CharField(max_length=15)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)