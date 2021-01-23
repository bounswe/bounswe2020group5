from rest_framework import viewsets, status
from ..models import Product, Vendor, Customer, Category, Document, ProductList, Comment, SubCategory, User, Purchase
from ..serializers import ProductSerializer, AddProductSerializer, DeleteProductSerializer, SuccessSerializer, EmptySerializer
from ..serializers import ProductListSerializer, CreateProductListSerializer, DeleteProductListSerializer, ProductListAddProductSerializer, ProductListRemoveProductSerializer, ResponseSerializer, ProductListResponseSerializer
from ..serializers import CommentSerializer, ProductAddCommentSerializer, ProductAllCommentsSerializer, CategoryProductsSeriazlier, UpdateProductSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action, api_view, permission_classes
from ..utils import create_product
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import MultiPartParser, JSONParser
from api.custom_permissions import IsAuthCustomer, IsAuthVendor
from ..models import PriceAlarm, Notification, NotificationType

class ProductOptViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'add': AddProductSerializer,
        'delete': DeleteProductSerializer,
        'update_product' : UpdateProductSerializer,
        'add_comment': ProductAddCommentSerializer,
        'get_all_comments': ProductAllCommentsSerializer,
        'get_user_comments': EmptySerializer
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
                    break
        else:
            return Response(data={'error': 'Product does not belong to requested vendor'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(data={'success': 'Successfully deleted product'}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthVendor, ], url_name='update_product')
    def update_product(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        product_id = data['product_id']
        product = Product.objects.get(id=product_id)
        vendor =  Vendor.objects.get(user=request.user)
        vendor_products = Product.objects.filter(vendor=vendor)

        if product in vendor_products:
            if 'name' in data:
                product.name = data['name']
            if 'price' in data:
                alarms = PriceAlarm.objects.filter(product=product)

                # check all alarms contains updated product to notify customers 
                for alarm in alarms:
                    if data['price'] < alarm.price:
                        new_price = data['price'] 
                        text = f'Price of {product.name} go down to {new_price}.'
                        notification_type = NotificationType.PRICE_ALARM
                        notification = Notification(text= text, notificationType=notification_type.value , user=alarm.customer.user, product=product, order=None)
                        notification.save()

                product.price = data['price']
            if 'stock' in data:
                product.stock = data['stock']
            if 'description' in data:
                product.description = data['description']
            if 'discount' in data:
                product.discount = data['discount']

            product.save()
            return Response(data={'success': 'Successfully updated product'}, status=status.HTTP_200_OK)
        
        else:
            return Response(data={'error': 'Product does not belong to requested vendor'}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthCustomer, ])
    def add_comment(self, request):
        product_id = request.data.get("product_id")
        try:    
            product = Product.objects.get(id=product_id)
        except:
            return Response(data={'error': 'No product found'}, status=status.HTTP_400_BAD_REQUEST)    
        try:
            customer = Customer.objects.get(user=request.user)
        except:
            return Response(data={'error': 'Unauthorized user'}, status=status.HTTP_401_UNAUTHORIZED)
        purchases = Purchase.objects.filter(customer=customer, product=product)
        if len(purchases) == 0:
            return Response(data={'error': 'Cannot comment on this product'}, status=status.HTTP_400_BAD_REQUEST)
        valid_purchase = False
        for purchase in purchases:
            if not(purchase.status == 'Ccancelled' or purchase.status == 'Vcancelled'):
                valid_purchase = True
                break
        if not valid_purchase:        
            return Response(data={'error': 'Cannot comment on this product'}, status=status.HTTP_400_BAD_REQUEST)
        comment_text = request.data.get("comment_text")
        is_anonymous = request.data.get("is_anonymous")
        rating_score = request.data.get("rating_score")
        comment = Comment(customer=customer, product=product, comment_text=comment_text, rating_score=rating_score, is_anonymous=is_anonymous)
        comment.save()
        product.rating_count += 1
        product.total_rating_score += rating_score
        product.save()
        return Response(data={'success': 'Comment added, Rating is given'}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: CommentSerializer(many=True)})
    @action(methods=['POST'], detail=False, queryset = "", permission_classes=[])
    def get_all_comments(self, request):
        product_id = request.data.get("product_id")
        comments = Comment.objects.filter(product_id=product_id)
        comment_contents = CommentSerializer(comments, many=True)
        return Response(data=comment_contents.data, status=status.HTTP_200_OK)
        
    # Takes the requesting customer user and finds all comments given by that user
    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: CommentSerializer(many=True)})
    @action(methods=['POST'], detail=False, queryset = "", permission_classes=[IsAuthCustomer, ])
    def get_user_comments(self, request):
        customer = Customer.objects.get(user=request.user)
        comments = Comment.objects.filter(customer=customer)
        comment_contents = CommentSerializer(comments, many=True)
        return Response(data=comment_contents.data, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

class ProductListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductList.objects.all()
    serializer_class = ProductListSerializer

class ProductListOptViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'add': CreateProductListSerializer,
        'delete': DeleteProductListSerializer,
        'add_product': ProductListAddProductSerializer,
        'remove_product': ProductListRemoveProductSerializer,
        'my': EmptySerializer,
    }

    @swagger_auto_schema(method='get', responses={status.HTTP_200_OK: ProductListSerializer(many=True)})
    @action(methods=['GET', ], detail=False, permission_classes=[IsAuthCustomer,])
    def my(self, request):
        user = Customer.objects.filter(user=request.user).first()
        product_lists = ProductList.objects.filter(user=user)
        content = ProductListSerializer(product_lists, many=True)
        return Response(data=content.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: ProductListResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def add(self, request):
        name = request.data.get("name")
        user = Customer.objects.filter(user=request.user).first()
        existing_list = ProductList.objects.filter(user=user, name=name)
        if existing_list:
            return Response(data={'ok': False, 'message': "list with same name exists"}, status=status.HTTP_400_BAD_REQUEST)
        product_list = ProductList(name=name, user=user)
        product_list.save()
        content = ProductListSerializer(product_list)
        return Response(data={'ok': True, 'data': content.data, 'message': "created"}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: ProductListResponseSerializer, status.HTTP_401_UNAUTHORIZED: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def delete(self, request):
        list_id = request.data.get("list_id")
        try:
            product_list = ProductList.objects.get(id=list_id)
        except ProductList.DoesNotExist:
            product_list = None

        if product_list is None:
            return Response(data={'ok': False, 'message': "bad request"}, status=status.HTTP_400_BAD_REQUEST)
        user = Customer.objects.filter(user=request.user).first()
        if user is None or user != product_list.user:
            return Response(data={'ok': False, 'message': "auth error"}, status=status.HTTP_401_UNAUTHORIZED)
        product_list.delete()
        return Response(data={'ok': True, 'data': {'id': list_id}, 'message': "removed"}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: ProductListResponseSerializer, status.HTTP_401_UNAUTHORIZED: ResponseSerializer})
    @action(methods=['POST', ], detail=False, permission_classes=[IsAuthCustomer, ])
    def add_product(self, request):
        list_id = request.data.get("list_id")
        product_id = request.data.get("product_id")
        
        try:
            product_list = ProductList.objects.get(id=list_id)
        except ProductList.DoesNotExist:
            product_list = None

        if product_list is None:
            return Response(data={'ok': False, 'message': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            product = None

        if product is None:
            return Response(data={'ok': False, 'message': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)

        user = Customer.objects.filter(user=request.user).first()
        if user is None or user != product_list.user:
            return Response(data={'ok': False, 'message': 'auth error'}, status=status.HTTP_401_UNAUTHORIZED)
        
        message = "product added"
        if product not in product_list.products.all():
            product_list.products.add(product) 
        else:
            message = "product already in list"
        
        content = ProductListSerializer(product_list)
        return Response(data={'ok': True, 'data': content.data, "message": message}, status=status.HTTP_200_OK)

    @swagger_auto_schema(method='POST', responses={status.HTTP_200_OK: ProductListResponseSerializer, status.HTTP_401_UNAUTHORIZED: ResponseSerializer})
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
        
        message = 'product removed from list'
        if product in product_list.products.all():
            product_list.products.remove(product)
        else:
            message = 'product already not in list'

        content = ProductListSerializer(product_list)
        return Response(data={'ok': True, 'data': content.data, 'message': message }, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
