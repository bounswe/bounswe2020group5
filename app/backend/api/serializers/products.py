from rest_framework import serializers
from ..models import Product, ProductList, Customer


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

#ProductList Serializer
class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductList
        fields = '__all__'

class CreateProductListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250, required=True)

class DeleteProductListSerializer(serializers.Serializer):
    list_id = serializers.IntegerField(required=True)

class ProductListAddProductSerializer(serializers.Serializer):
    list_id = serializers.IntegerField(required=True)
    product_id = serializers.IntegerField(required=True)

class ProductListRemoveProductSerializer(serializers.Serializer):
    list_id = serializers.IntegerField(required=True)
    product_id = serializers.IntegerField(required=True)

class ResponseSerializer(serializers.Serializer):
    ok = serializers.CharField(max_length=200)
  
