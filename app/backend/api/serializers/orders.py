from rest_framework import serializers
from ..models import Customer, CreditCard, Purchase, VendorRating, Shipment
from ..serializers import ProductSerializer

# CreditCard Serializer
class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('id', 'name', 'customer', 'card_owner', 'card_number', 'expiration_date', 'cvc_security_number')

class AddCreditCardSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50, required=False)
    card_owner = serializers.CharField(max_length=250, required=True)
    card_number = serializers.CharField(max_length=16, required=True)
    expiration_date = serializers.CharField(max_length=5, required=True)
    cvc_security_number = serializers.CharField(max_length=3, required=True)

class DeleteCreditCardSerializer(serializers.Serializer):
    creditcard_id = serializers.IntegerField(required=True)

class CancelOrderSerializer(serializers.Serializer):
    order_id = serializers.IntegerField(required=True)

class CancelPurchaseSerializer(serializers.Serializer):
    purchase_id = serializers.IntegerField(required=True)

# Purchase Serializer
class PurchaseSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField('get_product')

    class Meta:
        model = Purchase
        fields = ('id', 'customer', 'vendor', 'product', 'amount', 'unit_price', 'order', 'status')
    
    def get_product(self, obj):
        return ProductSerializer(obj.product).data

class UpdateStatusSerializer(serializers.Serializer):
    purchase_id = serializers.IntegerField(required=True)
    status = serializers.CharField(max_length=100, required=True)

class CustomerPurchasedSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)

class MessageResponseSerializer(serializers.Serializer):
    message = serializers.BooleanField()

class CustomerOrderSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    purchases = serializers.ListField(child = PurchaseSerializer())

# Vendor Rating Serializer
class VendorRatingSerializer(serializers.ModelSerializer):    
    class Meta:
        model = VendorRating
        fields = ('purchase', 'vendor', 'rating_score')

class AddVendorRatingSerializer(serializers.Serializer):
    purchase_id = serializers.IntegerField(required=True)
    rating_score = serializers.IntegerField(required=True)

class VendorRatingInProductPageSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)

class VendorRatingResponseSerializer(serializers.Serializer):
    score = serializers.IntegerField()

#Shipment Serializer
class ShipmentSerializer(serializers.ModelSerializer):
    purchase = serializers.SerializerMethodField('get_purchase')
    class Meta:
        model = Shipment
        fields = ('id', 'purchase', 'date', 'cargo_no', 'cargo_company')
    
    def get_purchase(self, obj):
        return PurchaseSerializer(obj.purchase).data

class AddShipmentSerializer(serializers.Serializer):
    purchase_id = serializers.IntegerField(required=True)
    cargo_company = serializers.CharField(required=True)

class GetShipmentSerializer(serializers.Serializer):
    purchase_id = serializers.IntegerField(required=True)

class ShipmentCargoNoSerializer(serializers.Serializer):
    cargo_no = serializers.CharField(required=True)