from rest_framework import serializers
from ..models import Product

#Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class AddProductSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    stock = serializers.IntegerField()
    description = serializers.CharField(max_length=500)
    image_file = serializers.FileField()
    category_name = serializers.CharField(max_length=250)