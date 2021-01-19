from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from ..serializers import FilterProductSerializer, ProductSerializer, ProductSearchSerializer, SortProductSerializer
from rest_framework.response import Response
from rest_framework import status
from ..models import Product, User, Vendor, SearchHistory
from django.db.models import Max
from nltk.stem import PorterStemmer
from django.db.models import Q
import operator
from datamuse import datamuse
from django.core.exceptions import ObjectDoesNotExist

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=ProductSearchSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def search_products(request):
    products = []

    serializer = ProductSearchSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    query = serializer.validated_data['query']
    if not query:
        return Response(data={'error': 'Query is not valid'}, status=status.HTTP_400_BAD_REQUEST)

    porter_stemmer = PorterStemmer()
    query_list = [q.strip() for q in query.split()]
    stem_list = [porter_stemmer.stem(q) for q in query_list]
    
    Q_strict = Q()
    for index in range(len(query_list)):
        Q_product = Q(name__icontains=query_list[index]) | Q(description__icontains=query_list[index]) | Q(name__icontains=stem_list[index]) | Q(description__icontains=stem_list[index])
        Q_vendor = Q(vendor__user__username__icontains=query_list[index])
        Q_strict &= Q_product | Q_vendor

    if bool(Q_strict):
        products_strict = Product.objects.filter(Q_strict)
        for product in products_strict:
            if product not in products:
                products.append(product)

    Q_soft = Q()
    for index in range(len(query_list)):
        Q_product = Q(name__icontains=query_list[index]) | Q(description__icontains=query_list[index]) | Q(name__icontains=stem_list[index]) | Q(description__icontains=stem_list[index])
        Q_category = Q(subcategory__name__icontains=query_list[index]) | Q(subcategory__category__name__icontains=query_list[index])
        Q_vendor = Q(vendor__user__username__icontains=query_list[index])
        Q_soft |= Q_product | Q_category | Q_vendor

    if bool(Q_soft):
        products_soft = Product.objects.filter(Q_soft)
        for product in products_soft:
            if product not in products:
                products.append(product)

    datamuse_api = api = datamuse.Datamuse()
    keyword_list = datamuse_api.words(ml=query, max=5)
    Q_datamuse = Q()
    for keyword in keyword_list:
        word = keyword['word']
        Q_product = Q(name__icontains=word) | Q(description__icontains=word) | Q(subcategory__name__icontains=word) | Q(subcategory__category__name__icontains=word)
        Q_vendor = Q(vendor__user__username__icontains=word)
        Q_datamuse |= Q_product | Q_vendor
    
    if bool(Q_datamuse):
        products_datamuse = Product.objects.filter(Q_datamuse)
        for product in products_datamuse:
            if product not in products:
                products.append(product)

    # Add prodcuts to search history if user is authenticated
    if (not request.user.is_anonymous) and products:
        user = request.user

        search_history = SearchHistory.objects.filter(user=user).first()
        if search_history:
            search_history.delete()

        search_history = SearchHistory(user=user)
        search_history.save()
        for product in products:
            search_history.products.add(product)   

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
            upper_limit = P_discount_rate.aggregate(Max('discount'))
            P_discount_rate = P_discount_rate.filter(discount__range=(lower_limit, upper_limit['discount__max']))

    Products = set(P_brand) & set(P_vendor) & set(P_price_range) & set(P_rating) & set(P_discount_rate)
    content = ProductSerializer(Products, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=SortProductSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def sort_products(request):
    Products = Product.objects.all()
    dic = request.data
    if bool(dic) is False:
        return Response(data={'error': 'Query is not valid'}, status=status.HTTP_400_BAD_REQUEST)

    product_ids = dic['product_ids']
    sort_by = dic['sort_by']
    order = dic['order']

    if len(product_ids) > 0:
        Q_filter = Q()
        for product_id in product_ids:
            Q_filter |= Q(id=product_id)
        Products = Products.filter(Q_filter)

    if sort_by == 'best_sellers':
        if order == 'descending':
            Products = Products.order_by('-number_of_sales')
        elif order == 'ascending':
            Products = Products.order_by('number_of_sales')

    elif sort_by == 'newest_arrivals':
        if order == 'descending':
            Products = Products.order_by('-date_added')
        elif order == 'ascending':
            Products = Products.order_by('date_added')

    elif sort_by == 'price':
        if order == 'descending':
            Products = Products.order_by('-price')
        elif order == 'ascending':
            Products = Products.order_by('price')

    elif sort_by == 'rating':
        if order == 'descending':
            Products = sorted(Products, key=operator.attrgetter('rating'), reverse=True)
        elif order == 'ascending':
            Products = sorted(Products, key=operator.attrgetter('rating'))
            
    elif sort_by == 'comments':
        if order == 'descending':
            Products = Products.order_by('-rating_count')
        elif order == 'ascending':
            Products = Products.order_by('rating_count')

    content = ProductSerializer(Products, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)
