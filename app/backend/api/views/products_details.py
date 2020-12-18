from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from ..serializers import ProductSerializer, CategoryProductsSeriazlier, SubCategoryProductsSeriazlier
from ..models import Product, Vendor, Category, SubCategory, User
from rest_framework import viewsets, status
from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductSerializer})
@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, pk):
    product = Product.objects.get(id=pk)
    if product is None:
        return Response(data={'error': 'No product found'}, status=status.HTTP_400_BAD_REQUEST)

    content = ProductSerializer(product).data
    return Response(data=content, status=status.HTTP_200_OK)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductSerializer})
@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    products = Product.objects.all()
    if products.exists() is False:
        return Response(data={'error': 'No products found'}, status=status.HTTP_400_BAD_REQUEST)

    content = ProductSerializer(products, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ProductSerializer}, request_body=CategoryProductsSeriazlier)
@api_view(['POST'])
@permission_classes([AllowAny])
def get_category_products(request):
    serializer = CategoryProductsSeriazlier(data=request.data)
    if serializer.is_valid():
        category_name = serializer.validated_data['category_name']
        category = Category.objects.get(name=category_name)
        subcategory = SubCategory.objects.filter(category_id=category.id)
        s_0 = subcategory[0]
        if s_0 is None:
            return Response(data={'error': 'No products found'}, status=status.HTTP_400_BAD_REQUEST)
        products = Product.objects.filter(subcategory_id=s_0.id)

        if products.exists() is False:
            return Response(data={'error': 'No products found'}, status=status.HTTP_400_BAD_REQUEST)
        
        subcategory = subcategory[1:]
        if subcategory.exists() is False:
            content = ProductSerializer(products, many=True).data
            return Response(data=content, status=status.HTTP_200_OK)
        
        for s in subcategory:
            products = products | Product.objects.filter(subcategory_id=s.id)
            
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
        subcategory = SubCategory.objects.get(name=subcategory_name)
        products = Product.objects.filter(subcategory_id=subcategory.id)
        
        if products.exists() is False:
            return Response(data={'error': 'No products found'}, status=status.HTTP_400_BAD_REQUEST)

        content = ProductSerializer(products, many=True).data
        return Response(data=content, status=status.HTTP_200_OK) 

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
