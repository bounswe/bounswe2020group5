from django.db import models
from django_unixdatetimefield import UnixDateTimeField
from .users import User

class Chat(models.Model):
    vendor_username = models.CharField(max_length=250)
    customer_username = models.CharField(max_length=250)
    product_id = models.IntegerField()
    created_date = UnixDateTimeField(auto_now_add=True)


class Message(models.Model):
    content = models.CharField(max_length=250)
    date_sent = UnixDateTimeField(auto_now_add=True)
    whose_message = models.CharField(max_length=15)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)

class UnreadMessages(models.Model):
    to_whom = models.CharField(max_length=15)
    chat_id = models.IntegerField()