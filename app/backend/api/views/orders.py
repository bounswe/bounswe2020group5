from rest_framework import viewsets, status
from ..models import Customer, CreditCard, Purchase, Cart, ProductInCart, Order, Notification, NotificationType, FavoriteList, ProductList
from ..serializers import CreditCardSerializer, AddCreditCardSerializer, DeleteCreditCardSerializer, SuccessSerializer
from .. serializers import PurchaseSerializer, EmptySerializer
from ..utils import stock_end_notifications, stock_replenish_notifications
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from api.custom_permissions import IsAuthCustomer

class CreditCardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

class CreditCardOptsViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'add': AddCreditCardSerializer,
        'delete': DeleteCreditCardSerializer,
        'get_all_credit_cards': EmptySerializer
    }

    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthCustomer, ])
    def add(self, request):
        name = request.data.get("name")
        customer = Customer.objects.get(user=request.user)
        card_owner = request.data.get("card_owner")
        card_number = request.data.get("card_number")
        expiration_date = request.data.get("expiration_date")
        cvc_security_number = request.data.get("cvc_security_number")

        credit_card = CreditCard(name=name, customer=customer, card_owner=card_owner, card_number=card_number, 
                                    expiration_date=expiration_date, cvc_security_number=cvc_security_number)
        credit_card.save()
        return Response(data={'success': 'Credit card is successfully added'}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthCustomer, ])
    def delete(self, request):
        creditcard_id = request.data.get("creditcard_id")
        credit_card = CreditCard.objects.get(id=creditcard_id)
        customer = Customer.objects.get(user=request.user)
        customer_cards = CreditCard.objects.filter(customer=customer)
        if credit_card in customer_cards:
            credit_card.delete()
        else:
            return Response(data={'error': 'This credit card does not belong to this customer'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'success': 'Credit card is successfully deleted'}, status=status.HTTP_200_OK)

    
    @swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer})
    @action(methods=['POST'], detail=False, queryset = "", permission_classes=[IsAuthCustomer, ])
    def get_all_credit_cards(self, request):
        customer = Customer.objects.get(user=request.user)
        credit_cards = CreditCard.objects.filter(customer=customer)
        credit_card_contents = CreditCardSerializer(credit_cards, many=True)
        return Response(data=credit_card_contents.data, status=status.HTTP_200_OK)
    
    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

class PurchaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class PurchaseOptsViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_classes = {
        'make_purchase': EmptySerializer
    }
    @swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer})
    @action(methods=['POST'], detail=False, permission_classes=[IsAuthCustomer, ])
    def make_purchase(self, request):
        customer = Customer.objects.get(user=request.user)
        cart = Cart.objects.get(user=customer)
        cart_items = ProductInCart.objects.filter(cart=cart)
        if len(cart_items) == 0:
            return Response(data={'error': 'The cart is empty, nothing to purchase'}, status=status.HTTP_400_BAD_REQUEST)
        order = Order(customer=customer)
        order.save()
        for cart_item in cart_items:
            product = cart_item.product
            amount = cart_item.count
            vendor = product.vendor
            unit_price = product.price * (1 - product.discount/100)
            product.number_of_sales += amount
            stock_before_update = product.stock
            product.stock -= amount
            if product.stock == 0 and stock_before_update != 0:
                stock_end_notifications(product)
            product.save()
            purchase = Purchase(customer=customer, vendor=vendor, product=product, amount=amount, 
                                    unit_price=unit_price, order=order, status='OrderTaken')
            purchase.save()
        # Create a notification about the new order.
        text = f'Your order {order.id} is taken by the vendor. You can check the status of your order from orders page.'
        notification_type = NotificationType.ORDER_STATUS_CHANGED
        order_notification = Notification(text=text, notificationType=notification_type.value, user=request.user, product=None, order=order)
        order_notification.save()
        ProductInCart.objects.filter(cart=cart).delete()
        return Response(data={'success': 'Products in cart are successfully purchased'}, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
        