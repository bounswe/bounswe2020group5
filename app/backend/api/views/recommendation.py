from rest_framework.decorators import api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Product, SearchHistory, Cart, ProductInCart, Customer, FavoriteList, ProductList, Purchase, User
from ..serializers import ProductSerializer
from django.db.models import Q
from datamuse import datamuse
import datetime

"""
Recommends products for both guest and customer users,
Based on search history, cart, product lists and purchases for authenticated customer,
Supports semantically similar products with datamuse API   
"""
@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductSerializer(many=True)})
@api_view(['GET'])
@permission_classes([AllowAny])
def recommend_products(request):
    number_of_products = 15

    # recommends best sellers for guest user
    if request.user.is_anonymous:
        products = Product.objects.order_by('-number_of_sales')[:number_of_products]
        content = ProductSerializer(products, many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)
    
    # recommends products for authenticated customer
    if (not request.user.is_anonymous) and (request.user.is_customer):
        
        products = set()

        user = request.user
        search_history = SearchHistory.objects.filter(user=user).first()
        if search_history:
            for product in search_history.products.all():
                products.add(product)

        query = set()
        customer = Customer.objects.get(user=user)

        # check cart of customer for recommendation
        cart = Cart.objects.filter(user=customer).first()
        if cart:
            objects = ProductInCart.objects.filter(cart=cart)
            for obj in objects:
                query.add(obj.product)
        
        # check favorite list of customer for recommendation
        favorite_list = FavoriteList.objects.filter(user=customer).first()
        if favorite_list:
            for product in favorite_list.products.all():
                query.add(product)
        
        # check lists of customer for recommendation
        product_lists = ProductList.objects.filter(user=customer)
        for product_list in product_lists:
            for product in product_list.products.all():
                query.add(product)

        # check purchases of customer for recommendation
        purchases = Purchase.objects.filter(customer=customer)
        for purchase in purchases:
            query.add(purchase.product)

        Q_filter = Q()
        for product in query:
            sub_name = product.name.split()
            for sub in sub_name:
                Q_filter |= Q(name__icontains=sub) | Q(description__icontains=sub)
        
        Q_brand = Q()
        for product in query:
            Q_brand |= Q(brand__iexact=product.brand)

        Q_vendor = Q()
        for product in query:
            vendor = product.vendor
            user = User.objects.get(id=vendor.user_id)
            Q_vendor |= Q(vendor__user__username__iexact=user.username)
        
        Q_global = Q_filter | Q_brand | Q_vendor
        if bool(Q_global):
            products_filter = Product.objects.filter(Q_global)
            for product in products_filter:
                products.add(product)

        for product in query:
            if product in products:
                products.remove(product)
    
        if len(products) < number_of_products:
            diff = number_of_products - len(products)
            products_difference = Product.objects.order_by('-number_of_sales')[:diff]
            for product in products_difference:
                products.add(product)
        
        content = ProductSerializer(list(products)[:number_of_products], many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)
