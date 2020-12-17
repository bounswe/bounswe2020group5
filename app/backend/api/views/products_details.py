from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from ..serializers import ProductSerializer, ProductDetailSerializer, CategoryProductsSeriazlier, SubCategoryProductsSeriazlier
from ..models import Product, Vendor, Category, SubCategory, User
from rest_framework import viewsets, status
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(method='post', auto_schema=None)
@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductDetailSerializer})
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def product_detail(request, pk):
    product = Product.objects.get(id=pk)
    if product is None:
        return Response(data={'error': 'No product found'}, status=status.HTTP_400_BAD_REQUEST)

    content = ProductSerializer(product).data
    subcategory_id = product.subcategory_id
    subcategory = SubCategory.objects.get(id=subcategory_id)
    category_id = subcategory.category_id
    category = Category.objects.get(id=category_id)
    content['subcategory'] = subcategory.name
    content['category'] = category.name
    vendor_id = product.vendor_id 
    user = User.objects.get(id=vendor_id)
    content['vendor'] = user.username
    
    return Response(data=content, status=status.HTTP_200_OK)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductDetailSerializer})
@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    product_list = []
    products = Product.objects.all()

    for product in products:
        response = product_detail(request._request, product.id).data
        product_list.append(response)

    return Response(data=product_list, status=status.HTTP_200_OK)

@swagger_auto_schema(method='get', auto_schema=None)
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductDetailSerializer}, request_body=CategoryProductsSeriazlier)
@api_view(['GET','POST'])
@permission_classes([AllowAny])
def get_category_products(request):
    product_list = []
    serializer = CategoryProductsSeriazlier(data=request.data)
    if serializer.is_valid():
        category_name = serializer.validated_data['category_name']
        category = Category.objects.get(name=category_name)
        subcategory = SubCategory.objects.filter(category_id=category.id)

        for sub in subcategory:
            products = Product.objects.filter(subcategory_id=sub.id)
            for product in products:
                response = product_detail(request._request, product.id).data
                product_list.append(response)

        return Response(data=product_list, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='get', auto_schema=None)
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductDetailSerializer}, request_body=SubCategoryProductsSeriazlier)
@api_view(['GET','POST'])
@permission_classes([AllowAny])
def get_subcategory_products(request):
    product_list = []
    serializer = SubCategoryProductsSeriazlier(data=request.data)
    if serializer.is_valid():
        subcategory_name = serializer.validated_data['subcategory_name']
        subcategory = SubCategory.objects.get(name=subcategory_name)
        products = Product.objects.filter(subcategory_id=subcategory.id)

        for product in products:
            response = product_detail(request._request, product.id).data
            product_list.append(response)  

        return Response(data=product_list, status=status.HTTP_200_OK) 

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
