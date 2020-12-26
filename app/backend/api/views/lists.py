from rest_framework import viewsets, status
from ..serializers import ResponseSerializer, EmptySerializer
from ..serializers import FavoriteListSerializer, FavoritesAddOrRemoveProductSerializer, FavoritesResponseSerializer
from ..serializers import CartSerializer, CartUpdateSerializer, CartResponseSerializer
from ..models import Product, Customer, FavoriteList, Cart, ProductInCart
from api.custom_permissions import IsAuthCustomer
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action, api_view, permission_classes

class FavoritesViewSet(viewsets.GenericViewSet):
    permission_class = IsAuthCustomer
    serializer_classes = {
        'get': FavoriteListSerializer,
        'add': FavoritesAddOrRemoveProductSerializer,
        'remove': FavoritesAddOrRemoveProductSerializer
    }
    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: FavoriteListSerializer})
    @action(methods=['GET', ], detail=False, permission_classes=[IsAuthCustomer,])
    def get(self, request):
        user = Customer.objects.filter(user=request.user).first()
        favorite_list = FavoriteList.objects.filter(user=user).first()
        if not favorite_list:
            favorite_list = FavoriteList(user=user)
            favorite_list.save()
        content = FavoriteListSerializer(favorite_list)
        return Response(data=content.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: FavoritesResponseSerializer, status.HTTP_400_BAD_REQUEST: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def add(self, request):
        product_id = request.data.get('product_id')
        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response(data={'ok': False, 'message': 'product not found' }, status=status.HTTP_400_BAD_REQUEST)
        user = Customer.objects.get(user=request.user)
        favorite_list = FavoriteList.objects.filter(user=user).first()
        if not favorite_list:
            favorite_list = FavoriteList(user=user)
            favorite_list.save()
        message = 'product added to favorites'
        if product in favorite_list.products.all():
            message = 'product already in favorites'
        else:
            favorite_list.products.add(product)
        content = FavoriteListSerializer(favorite_list)
        return Response(data={'ok': True, 'data': content.data,'message': message }, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: FavoritesResponseSerializer, status.HTTP_400_BAD_REQUEST: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def remove(self, request):
        product_id = request.data.get('product_id')
        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response(data={'ok': False, 'message': 'product not found' }, status=status.HTTP_400_BAD_REQUEST)
        user = Customer.objects.get(user=request.user)
        favorite_list = FavoriteList.objects.filter(user=user).first()
        if not favorite_list:
            favorite_list = FavoriteList(user=user)
            favorite_list.save()
        message = 'product removed from favorites'
        if product not in favorite_list.products.all():
            message = 'product already not in favorites'
        else:
            favorite_list.products.remove(product)
        content = FavoriteListSerializer(favorite_list)
        return Response(data={'ok': True, 'data': content.data,'message': message }, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

class CartViewSet(viewsets.GenericViewSet):
    permission_class = IsAuthCustomer
    serializer_classes = {
        'get': CartSerializer,
        'edit': CartUpdateSerializer,
        'clear': EmptySerializer
    }

    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: CartSerializer})
    @action(methods=['GET', ], detail=False, permission_classes=[IsAuthCustomer,])
    def get(self, request):
        user = Customer.objects.filter(user=request.user).first()
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            cart = Cart(user=user)
            cart.save()
        content = CartSerializer(cart)
        return Response(data=content.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: CartResponseSerializer, status.HTTP_400_BAD_REQUEST: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def edit(self, request):
        product_id = request.data.get('product_id')
        count = request.data.get('count')
        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response(data={'ok': False, 'message': 'product not found' }, status=status.HTTP_400_BAD_REQUEST)
        user = Customer.objects.get(user=request.user)
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            cart = Cart(user=user)
            cart.save()
        
        product_in_cart = ProductInCart.objects.filter(cart=cart, product=product).first()
        if count == 0:
            if product_in_cart:
                ProductInCart.objects.filter(cart=cart, product=product).delete()
                message = "product removed from cart"
            else:
                message = "product not in cart"
        else:
            if product_in_cart :
                ProductInCart.objects.filter(cart=cart, product=product).delete()
                ProductInCart.objects.create(cart=cart, product=product, count=count)
                message = "product count updated"
            else:
                ProductInCart.objects.create(cart=cart, product=product, count=count)
                message = "product added to cart with given count"
        
        content = CartSerializer(cart)
        return Response(data={'ok': True, 'data': content.data,'message': message }, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='DELETE', responses={status.HTTP_200_OK: CartSerializer})
    @action(methods=['DELETE', ], detail=False, permission_classes=[IsAuthCustomer,])
    def clear(self, request):
        user = Customer.objects.filter(user=request.user).first()
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            cart = Cart(user=user)
            cart.save()
        else:
            ProductInCart.objects.filter(cart=cart).delete()
        content = CartSerializer(cart)
        return Response(data={'ok': True, 'data': content.data,'message': 'cart emptied' }, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()    

