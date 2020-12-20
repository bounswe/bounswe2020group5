from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from ..serializers import FilterProductSerializer, ProductSerializer, ProductSearchSerializer
from rest_framework.response import Response
from rest_framework import status
from ..models import Product, User, Vendor
from django.db.models import Max
from nltk.stem import PorterStemmer
from django.db.models import Q

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=ProductSearchSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def search_products(request):
    products = Product.objects.none()
    products_m = Product.objects.none()
    dic = request.data
    query = dic['query']
    if not query:
        return Response(data={'error': 'Query is not valid'}, status=status.HTTP_400_BAD_REQUEST)

    porter_stemmer = PorterStemmer()
    query_list = [q.strip() for q in query.split()]
    stem_list = [porter_stemmer.stem(q) for q in query_list]
    
    Q_strict = Q()
    for index in range(len(query_list)):
        Q_strict &= Q(name__icontains=query_list[index]) | Q(description__icontains=query_list[index]) | Q(name__icontains=stem_list[index]) | Q(description__icontains=stem_list[index])

    if bool(Q_strict):
        products = Product.objects.filter(Q_strict)

    Q_soft = Q()
    for index in range(len(query_list)):
        Q_soft |= Q(name__icontains=query_list[index]) | Q(description__icontains=query_list[index]) | Q(name__icontains=stem_list[index]) | Q(description__icontains=stem_list[index])

    if bool(Q_soft):
        products_m = Product.objects.filter(Q_soft)
        products |= products_m

    content = ProductSerializer(products, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=FilterProductSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def filter_products(request):
    Products = Product.objects.all()
    dic = request.data
    if bool(dic) is False:
        return Response(data={'error': 'Query is not valid'}, status=status.HTTP_400_BAD_REQUEST)

    product_ids = dic['product_ids']
    filter_data = dic['filter_data']
    
    if len(product_ids) > 0:
        Q_filter = Q()
        for product_id in product_ids:
            Q_filter |= Q(id=product_id)
        Products = Products.filter(Q_filter)
    
    P_brand, P_vendor, P_price_range , P_rating, P_discount_rate = (Products, Products, Products, Products, Products)
    for filter_dic in filter_data:
        filter_by = filter_dic['filter_by']
        data = filter_dic['data']
        Q_filter = Q()

        if filter_by == 'brand':
            for brand in data:
                Q_filter |= Q(brand__iexact=brand)
        
            if bool(Q_filter):
                P_brand = P_brand.filter(Q_filter)
            else:
                P_brand = Product.objects.none()
        
        elif filter_by == 'vendor':
            for vendor in data:
                try:
                    user = User.objects.get(username=vendor)
                except:
                    return Response(data={'error': 'Vendor does not exist'}, status=status.HTTP_400_BAD_REQUEST)
                Q_filter |= Q(vendor_id=user.id)

            if bool(Q_filter):
                P_vendor = P_vendor.filter(Q_filter)
            else:
                P_vendor = Product.objects.none()
            
        elif filter_by == 'price_range':
            lower_limit = data['lower_limit']
            upper_limit = data['upper_limit']
            P_price_range = P_price_range.filter(price__range=(lower_limit, upper_limit))

        elif filter_by == 'rating':
            lower_limit = data
            for product in Products:
                if product.rating >= lower_limit:
                    Q_filter |= Q(id=product.id)

            if bool(Q_filter):
                P_rating = P_rating.filter(Q_filter)
            else:
                P_rating = Product.objects.none()

        elif filter_by == 'discount_rate':
            lower_limit = data
            upper_limit = Products.aggregate(Max('discount'))
            P_discount_rate = P_discount_rate.objects.filter(discount__range=(lower_limit, upper_limit['discount__max']))

    Products = set(P_brand) & set(P_vendor) & set(P_price_range) & set(P_rating) & set(P_discount_rate)
    content = ProductSerializer(Products, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)