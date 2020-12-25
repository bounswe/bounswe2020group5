from rest_framework import serializers
from ..models import Product, FavoriteList, Cart, ProductInCart
from .products import ResponseSerializer, ProductSerializer


# Favorites

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


# Carts

class CartSerializer(serializers.ModelSerializer):
    products_in_cart = serializers.SerializerMethodField('get_products_in_cart')
    class Meta:
        model = Cart
        fields = ('products_in_cart',)
    def get_products_in_cart(self, obj):
        products_in_cart = ProductInCart.objects.filter(cart=obj)
        content = ProductInCartSerializer(products_in_cart, many=True)
        return content.data

class CartUpdateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)
    count = serializers.IntegerField(required=True)

class CartResponseSerializer(ResponseSerializer):
    data = CartSerializer()

class ProductInCartSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField("get_product")
    class Meta:
        model = ProductInCart
        fields = ('count', 'product')

    def get_product(self, obj):
        product = obj.product
        return ProductSerializer(product).data

        