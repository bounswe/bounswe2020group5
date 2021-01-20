from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Product, SearchHistory, Cart, ProductInCart
from ..serializers import ProductSerializer

"""
Recommends products for both guest and customer users
"""
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer})
@api_view(['POST'])
@permission_classes([AllowAny])
def recommend_products(request):
    number_of_products = 10

    # recommends best sellers for guest user
    if request.user.is_anonymous:
        products = Product.objects.order_by('-number_of_sales')[:number_of_products]
        content = ProductSerializer(products, many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)
    
    # recommends products for authenticated customer
    if (not request.user.is_anonymous) and (request.user.is_customer):
        products = []

        user = request.user
        search_history = SearchHistory.objects.filter(user=user).first()
        if search_history:
            for product in search_history.products.all():
                products.append(product)
        
        # TODO: Check cart, favorite list, lists and purchased products
        query = []
        cart = Cart.objects.filter(user=user).first()
        if cart:
            objects = ProductInCart.objects.filter(cart=cart)
            for obj in objects:
                if obj.product not in query:
                    query.append(obj.product)
    