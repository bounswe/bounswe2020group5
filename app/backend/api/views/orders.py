from rest_framework import viewsets, status
from ..models import Customer, CreditCard
from ..serializers import CreditCardSerializer, AddCreditCardSerializer, DeleteCreditCardSerializer, SuccessSerializer, EmptySerializer
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
