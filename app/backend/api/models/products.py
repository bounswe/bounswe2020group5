from django.db import models
from .users import Vendor
import json

class Category(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=250)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    number_of_sales = models.IntegerField(default=0)
    image_url = models.TextField(default='')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    total_rating_score = models.IntegerField(default=0)
    rating_count = models.IntegerField(default=0)
    comments = models.TextField(default='[]')

    def set_comments(self, value):
        self.comments = json.dumps(value)

    def get_comments(self):
        return json.loads(self.comments)

    def __str__(self):
        return self.name