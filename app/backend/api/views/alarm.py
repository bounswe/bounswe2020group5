from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from ..custom_permissions import IsAuthCustomer
from rest_framework.response import Response
from ..serializers import SuccessSerializer, SetPriceAlarmSerializer, DeletePriceAlarmSerializer, PriceAlarmSerializer
from ..models import Customer, Product, PriceAlarm

"""
Sets alarm for a certain price in terms of product for customers
"""
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer}, request_body=SetPriceAlarmSerializer)
@api_view(['POST'])
@permission_classes([IsAuthCustomer])
def set_price_alarm(request):
    serializer = SetPriceAlarmSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = request.user
    product_id = serializer.validated_data['product_id']
    price = serializer.validated_data['price']

    customer = Customer.objects.get(user=user)
    product = Product.object.get(id=product_id)

    alarm = PriceAlarm.objects.filter(customer=customer, product=product).first()
    if alarm:
        alarm.price = price
    else:
        alarm = PriceAlarm(customer=customer, product=product, price=price)
        alarm.save()
    
    return Response(data={'success': 'Alarm is successfully set.'}, status=status.HTTP_200_OK)

"""
Deletes price alarm in terms of product for customers
"""
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer}, request_body=DeletePriceAlarmSerializer)
@api_view(['POST'])
@permission_classes([IsAuthCustomer])
def delete_price_alarm(request):
    serializer = SetPriceAlarmSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = request.user
    product_id = serializer.validated_data['product_id']
    
    customer = Customer.objects.get(user=user)
    product = Product.object.get(id=product_id)

    alarm = PriceAlarm.objects.filter(customer=customer, product=product).first()
    if alarm:
        alarm.delete()
    else:
        return Response(data={'error': 'Alarm does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(data={'success': 'Alarm is successfully deleted.'}, status=status.HTTP_200_OK)

"""
Returns all price alarms in terms of products for customers
"""
@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: PriceAlarmSerializer(many=True)})
@api_view(['GET'])
@permission_classes([IsAuthCustomer])
def my_price_alarms(request):
    user = request.user 
    customer = Customer.objects.get(user=user)
    alarms = PriceAlarm.objects.filter(customer=customer)

    content = PriceAlarmSerializer(alarms, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)
    