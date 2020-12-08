from rest_framework import viewsets, status
from ..models import Product, Vendor, Category
from ..serializers import ProductSerializer, AddProductSerializer, SuccessSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from ..utils import create_product
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import MultiPartParser

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductOptViewSet(viewsets.GenericViewSet):
    parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'add' : AddProductSerializer
    }

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthenticated, ])
    def add(self, request):
        name = request.data.get("name")
        price = request.data.get("price")
        stock = request.data.get("stock")
        description = request.data.get("description")
        image_file = request.data.get("image_file")
        category_name = request.data.get("category_name")
        category = Category.objects.filter(name=category_name)
        vendor = Vendor(user=request.user)

        create_product(name=name, price=price, stock=stock, description=description, category=category, vendor=vendor)
        return Response(data={'success': 'Successfully created product'}, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()