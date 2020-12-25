from django.db import models

class Chat(models.Model):
    vendor_id = models.CharField(max_length=250)
    customer_id = models.CharField(max_length=250)


class Message(models.Model):
    context = models.CharField(max_length=250)
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)
    whose_message = models.BooleanField(default=True)