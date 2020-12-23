from rest_framework import serializers
from ..models import Product, FavoriteList
from .products import ResponseSerializer, ProductSerializer

class FavoriteListSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField('get_products')

    class Meta:
        model = FavoriteList
        fields = ('products',)
    
    def get_products(self, obj):
        products = obj.products.all()
        content = ProductSerializer(products, many=True)
        return content.data

class FavoritesAddOrRemoveProductSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)

class FavoritesResponseSerializer(ResponseSerializer):
    data = FavoriteListSerializer()