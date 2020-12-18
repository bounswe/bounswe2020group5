from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from ..serializers import FilterProductSerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from ..models import Product, User, Vendor
from django.db.models import Max

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=FilterProductSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def filter_products(request):
    products = Product.objects.none()
    dic = request.data
    if bool(dic) is False:
        return Response(data={'error': 'Query is not valid'}, status=status.HTTP_400_BAD_REQUEST)

    filter_by = dic['filter_by']
    data = dic['data']
    if filter_by == 'brand':
        products = Product.objects.filter(brand=data)

    elif filter_by == 'vendor':
        user = User.objects.get(username=data)
        products = Product.objects.filter(vendor_id=user.id)

    elif filter_by == 'price_range':
        lower_limit = data['lower_limit']
        upper_limit = data['upper_limit']
        products = Product.objects.filter(price__range=(lower_limit, upper_limit))

    elif filter_by == 'rating':
        lower_limit = data
        products_m = Product.objects.all()
        for product in products_m:
            if product.rating >= lower_limit:
                products |= Product.objects.filter(id=product.id)
                
    elif filter_by == 'discount_rate':
        lower_limit = data
        upper_limit = Product.objects.all().aggregate(Max('discount'))
        products = Product.objects.filter(discount__range=(lower_limit, upper_limit['discount__max']))
    
    if products.exists() is False:
        return Response(data={'error': 'No products found'}, status=status.HTTP_400_BAD_REQUEST)
            
    content = ProductSerializer(products, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)
