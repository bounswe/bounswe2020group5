from django.db import models

class Chat(models.Model):
    vendor_id = models.CharField(max_length=250)
    date_created = models.DateTimeField(auto_now_add=True)
    customer_id = models.CharField(max_length=250)

class Message(models.Model):
    context = models.CharField(max_length=250)
    date_sent = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)
    whose_message = models.BooleanField(default=True)