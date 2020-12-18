from rest_framework import viewsets, status
from ..models import Product, Vendor, Customer, Category, Document, ProductList, Comment, SubCategory, User
from ..serializers import ProductSerializer, AddProductSerializer, DeleteProductSerializer, SuccessSerializer
from ..serializers import ProductListSerializer, CreateProductListSerializer, DeleteProductListSerializer, ProductListAddProductSerializer, ProductListRemoveProductSerializer, ResponseSerializer
from ..serializers import CommentSerializer, ProductAddCommentSerializer, ProductAddRatingSerializer, CategoryProductsSeriazlier
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action, api_view, permission_classes
from ..utils import create_product
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import MultiPartParser, JSONParser
from api.custom_permissions import IsAuthCustomer, IsAuthVendor

class ProductOptViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'add': AddProductSerializer,
        'delete': DeleteProductSerializer,
        'add_comment': ProductAddCommentSerializer,
        'add_rating': ProductAddRatingSerializer
    }

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthVendor, ], parser_classes=(MultiPartParser,))
    def add(self, request):
        name = request.data.get("name")
        price = request.data.get("price")
        stock = request.data.get("stock")
        description = request.data.get("description")
        document = Document(upload=request.data.get("image_file"))
        document.save()
        image_file = document.upload
        subcategory_name = request.data.get("subcategory_name") 
        subcategory = SubCategory.objects.get(name=subcategory_name)
        vendor = Vendor.objects.get(user=request.user)
        brand = request.data.get("brand")
        discount = request.data.get("discount")
        
        create_product(name=name, price=price, stock=stock, description=description,
                       image_url=image_file.url, subcategory=subcategory, vendor=vendor, brand=brand, discount=discount)

        return Response(data={'success': 'Successfully created product'}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthVendor, ])
    def delete(self, request):
        product_id = request.data.get("product_id")
        product = Product.objects.get(id=product_id)
        vendor =  Vendor.objects.get(user=request.user)
        vendor_products = Product.objects.filter(vendor=vendor)

        if product in vendor_products:
            image_url = product.image_url
            product.delete()
            for document in Document.objects.all():
                if document.upload.url == image_url:
                    document.delete()
        else:
            return Response(data={'error': 'Product does not belong to requested user'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(data={'success': 'Successfully deleted product'}, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthCustomer, ])
    def add_comment(self, request):
        product_id = request.data.get("product_id")
        product = Product.objects.get(id=product_id)
        if product is None:
            return Response(data={'error': 'No product found'}, status=status.HTTP_400_BAD_REQUEST)
        user = Customer(user=request.user)
        if user is None:
            return Response(data={'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)
        comment_text = request.data.get("comment_text")
        is_anonymous = request.data.get("is_anonymous")
        comment = Comment(user=user, comment_text=comment_text, is_anonymous=is_anonymous)
        comment.save()
        product.comments.add(comment)
        product.save()
        return Response(data={'success': 'Comment added'}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthCustomer, ])
    def add_rating(self, request):
        product_id = request.data.get("product_id")
        product = Product.objects.get(id=product_id)
        if product is None:
            return Response(data={'error': 'No product found'}, status=status.HTTP_400_BAD_REQUEST)
        user = Customer(user=request.user)
        if user is None:
            return Response(data={'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)
        product.rating_count += 1
        product.total_rating_score += request.data.get("rating_score")
        product.save()
        return Response(data={'success': 'Rating is given'}, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()


class ProductListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductList.objects.all()
    serializer_class = ProductListSerializer


class ProductListOptViewSet(viewsets.GenericViewSet):
    #parser_classes = (JSONParser,)
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'add': CreateProductListSerializer,
        'delete': DeleteProductListSerializer,
        'add_product': ProductListAddProductSerializer,
        'remove_product': ProductListRemoveProductSerializer,
    }

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def add(self, request):
        name = request.data.get("name")
        user = Customer(user=request.user)
        product_list = ProductList(name=name, user=user)
        product_list.save()
        return Response(data={'ok': True}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: ResponseSerializer, status.HTTP_401_UNAUTHORIZED: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def delete(self, request):
        list_id = request.data.get("list_id")
        try:
            product_list = ProductList.objects.get(id=list_id)
        except ProductList.DoesNotExist:
            product_list = None

        if product_list is None:
            return Response(data={'ok': False}, status=status.HTTP_400_BAD_REQUEST)
        user = Customer.objects.filter(user=request.user).first()
        if user is None or user != product_list.user:
            return Response(data={'ok': False}, status=status.HTTP_401_UNAUTHORIZED)
        product_list.delete()
        return Response(data={'ok': True}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: ResponseSerializer, status.HTTP_401_UNAUTHORIZED: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def add_product(self, request):
        list_id = request.data.get("list_id")
        product_id = request.data.get("product_id")

        try:
            product_list = ProductList.objects.get(id=list_id)
        except ProductList.DoesNotExist:
            product_list = None

        if product_list is None:
            return Response(data={'ok': False}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            product = None

        if product_list is None or product is None:
            return Response(data={'ok': False}, status=status.HTTP_400_BAD_REQUEST)

        user = Customer.objects.filter(user=request.user).first()
        if user is None or user != product_list.user:
            return Response(data={'ok': False}, status=status.HTTP_401_UNAUTHORIZED)

        if product not in product_list.products.all():
            product_list.products.add(product)

        return Response(data={'ok': True}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: ResponseSerializer, status.HTTP_401_UNAUTHORIZED: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def remove_product(self, request):
        list_id = request.data.get("list_id")
        product_id = request.data.get("product_id")
        try:
            product_list = ProductList.objects.get(id=list_id)
        except ProductList.DoesNotExist:
            product_list = None
        if product_list is None:
            return Response(data={'ok': False}, status=status.HTTP_400_BAD_REQUEST)
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            product = None
        if product_list is None or product is None:
            return Response(data={'ok': False}, status=status.HTTP_400_BAD_REQUEST)
        user = Customer.objects.filter(user=request.user).first()
        if user is None or user != product_list.user:
            return Response(data={'ok': False}, status=status.HTTP_401_UNAUTHORIZED)
        product_list.products.remove(product)
        return Response(data={'ok': True}, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
