from rest_framework import serializers
from ..models import PriceAlarm, User
from ..serializers import ProductSerializer

class PriceAlarmSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField('get_customer')
    product = serializers.SerializerMethodField('get_product')

    class Meta:
        model = PriceAlarm
        fields = ('customer', 'product', 'price')
    
    def get_customer(self, obj):
        user_id = obj.customer.user_id
        user = User.objects.get(id=user_id)

        return user.username
    
    def get_product(self, obj):
        content = ProductSerializer(obj.product).data
        return content

class SetPriceAlarmSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)
    price = serializers.FloatField(required=True)

class DeletePriceAlarmSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)
