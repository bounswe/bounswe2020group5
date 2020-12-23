from rest_framework import serializers
from ..models import Customer, CreditCard

#Credit Card Serializer
class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('id', 'name', 'customer', 'card_number', 'expiration_date', 'cvc_security_number')

class AddCreditCardSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50, required=False)
    card_owner = serializers.CharField(max_length=250, required=True)
    card_number = serializers.CharField(max_length=16, required=True)
    expiration_date = serializers.CharField(max_length=5, required=True)
    cvc_security_number = serializers.IntegerField(required=True)

class DeleteCreditCardSerializer(serializers.Serializer):
    creditcard_id = serializers.IntegerField(required=True)

class CancelOrderSerializer(serializers.Serializer):
    order_id = serializers.IntegerField(required=True)

class CancelPurchaseSerializer(serializers.Serializer):
    purchase_id = serializers.IntegerField(required=True)
