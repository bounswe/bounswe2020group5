from django.db import models
from .users import Vendor, Customer
import json

class Document(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    upload = models.FileField()

class Category(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=250)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=250)
    price = models.FloatField()
    stock = models.IntegerField()
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    number_of_sales = models.IntegerField(default=0)
    image_url = models.TextField(default='')
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    total_rating_score = models.IntegerField(default=0)
    rating_count = models.IntegerField(default=0)
    brand = models.CharField(max_length=250)
    discount = models.FloatField(default=0)  
    _rating = models.FloatField()

    @property
    def rating(self):
        if self.rating_count == 0:
            return 0
        value = (self.total_rating_score / self.rating_count)
        
        return value

    def __str__(self):
        return self.name

class Comment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=250)
    is_anonymous = models.BooleanField(default=False)

class ProductList(models.Model):
    name = models.CharField(max_length=250)
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    
    def __str__(self):
        return self.name
