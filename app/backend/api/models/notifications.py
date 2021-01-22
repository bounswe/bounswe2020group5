from django.db import models
import json
from enum import Enum 
from .users import User
from .orders import Order
from .products import Product


class NotificationType(Enum):
    STOCK_ENDED = 1
    STOCK_RENEWED = 2
    ORDER_STATUS_CHANGED = 3
    NEW_DISCOUNT = 4
    PRICE_ALARM = 5

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]

class Notification(models.Model):
    text = models.TextField()
    notificationType = models.IntegerField(choices=NotificationType.choices())
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

