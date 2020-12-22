from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from ..serializers import ProductSerializer, CategoryProductsSeriazlier, SubCategoryProductsSeriazlier
from ..serializers import HomePageRequestSerializer, HomePageResponseSerializer
from ..models import Product, Vendor, Category, SubCategory, User
from rest_framework import viewsets, status
from drf_yasg.utils import swagger_auto_schema
from ..custom_permissions import IsAuthVendor

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductSerializer})
@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except:
        return Response(data={'error': 'Product id is wrong'}, status=status.HTTP_400_BAD_REQUEST)

    content = ProductSerializer(product).data
    return Response(data=content, status=status.HTTP_200_OK)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductSerializer})
@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    products = Product.objects.all()
    content = ProductSerializer(products, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=CategoryProductsSeriazlier)
@api_view(['POST'])
@permission_classes([AllowAny])
def get_category_products(request):
    products = Product.objects.none()
    serializer = CategoryProductsSeriazlier(data=request.data)
    if serializer.is_valid():
        category_name = serializer.validated_data['category_name']
        try:
            category = Category.objects.get(name=category_name)
        except:
            return Response(data={'error': 'Category does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        subcategory = SubCategory.objects.filter(category_id=category.id)
        if subcategory.exists() is False:
            return Response(data={'error': 'Subcategory does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        s_0 = subcategory[0]
        products = Product.objects.filter(subcategory_id=s_0.id)        
        subcategory = subcategory[1:]
        if subcategory.exists() is False:
            content = ProductSerializer(products, many=True).data
            return Response(data=content, status=status.HTTP_200_OK)
        
        for s in subcategory:
            products |= Product.objects.filter(subcategory_id=s.id)
            
        content = ProductSerializer(products, many=True).data
        return Response(data=content, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=SubCategoryProductsSeriazlier)
@api_view(['POST'])
@permission_classes([AllowAny])
def get_subcategory_products(request):
    serializer = SubCategoryProductsSeriazlier(data=request.data)
    if serializer.is_valid():
        subcategory_name = serializer.validated_data['subcategory_name']
        try:
            subcategory = SubCategory.objects.get(name=subcategory_name)
        except:
            return Response(data={'error': 'Subcategory does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        products = Product.objects.filter(subcategory_id=subcategory.id)
        content = ProductSerializer(products, many=True).data
        return Response(data=content, status=status.HTTP_200_OK) 

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: HomePageResponseSerializer}, request_body=HomePageRequestSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def get_homepage_products(request):
    serializer = HomePageRequestSerializer(data=request.data)
    if serializer.is_valid():
        number_of_products = serializer.validated_data['number_of_products']
        response = {}
        newest_arrivals = Product.objects.order_by('-date_added')[:number_of_products]
        best_sellers = Product.objects.order_by('-number_of_sales')[:number_of_products]
        response['newest_arrivals'] = ProductSerializer(newest_arrivals, many=True).data
        response['best_sellers'] = ProductSerializer(best_sellers, many=True).data

        return Response(data=response, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductSerializer})
@api_view(['GET'])
@permission_classes([IsAuthVendor])
def get_vendor_products(request):
    vendor = request.user
    products = Product.objects.filter(vendor_id=vendor.id)
    products = ProductSerializer(products, many=True).data
    
    return Response(data=products, status=status.HTTP_200_OK)
