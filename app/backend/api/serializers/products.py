from rest_framework import serializers
from ..models import Product

#Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class AddProductSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250, required=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    stock = serializers.IntegerField(required=True)
    description = serializers.CharField(max_length=500, required=True)
    image_file = serializers.FileField(required=True)
    category_name = serializers.CharField(max_length=250, required=True)