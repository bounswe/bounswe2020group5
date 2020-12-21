from rest_framework import serializers
from ..models import Customer, CreditCard

#Credit Card Serializer
class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('id', 'name', 'customer', 'card_number', 'expiration_date', 'cvc_security_number')

class AddCreditCardSerializer(serializers.Serializer):
    name = serializers.charField(default='my Credit Card', max_length=50, required=False)
    card_owner = serializers.charField(max_length=250, required=True)
    card_number = serializers.charField(max_length=16, required=True)
    expiration_date = serializers.charField(max_length=5, required=True)
    cvc_security_number = serializers.IntegerField(max_value=999, min_value=100, required=True)

class DeleteCreditCardSerializer(serializers.Serializer):
    creditcard_id = serializers.IntegerField(required=True)

