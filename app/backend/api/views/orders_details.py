from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from ..custom_permissions import IsAuthCustomer, IsAuthVendor
from ..serializers import CancelOrderSerializer, CancelPurchaseSerializer, SuccessSerializer, PurchaseSerializer
from ..models import Product, Order, Purchase 
from rest_framework.response import Response

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: PurchaseSerializer(many=True)})
@api_view(['GET'])
@permission_classes([IsAuthVendor])
def get_vendor_purchases(request):
    purchases = Purchase.objects.filter(vendor=request.user)
    content = PurchaseSerializer(purchases, many=True)
    return Response(data=content.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer}, request_body=CancelPurchaseSerializer)
@api_view(['POST'])
@permission_classes([IsAuthVendor])
def vendor_cancel_purchase(request):
    serializer = CancelPurchaseSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    purchase_id = serializer.validated_data['purchase_id']
    
    purchase = Purchase.objects.get(id=purchase_id)
    if purchase.status == 'Ccancelled':
        return Response(data={'error': 'Purchase is already cancelled by customer'}, status=status.HTTP_400_BAD_REQUEST) 
    elif purchase.status == 'Vcancelled':
        return Response(data={'error': 'Purchase is already cancelled by vendor'}, status=status.HTTP_400_BAD_REQUEST)
    elif purchase.status == 'Ship':
        return Response(data={'error': 'Purchase is already at shipment stage'}, status=status.HTTP_400_BAD_REQUEST)
    elif purchase.status == 'Delivered':
        return Response(data={'error': 'Purchase is already delivered by customer'}, status=status.HTTP_400_BAD_REQUEST)
    elif purchase.status == 'OrderTaken' or purchase.status == 'Preparing':
            purchase.status = 'Vcancelled'
            purchase.save()
            product_id = purchase.product_id
            product_amount = purchase.amount
            product = Product.objects.get(id=product_id)
            product.stock += product_amount
            product.number_of_sales -= product_amount
            product.save()

    return Response(data={'success': 'Purchase is successfully canceled.'}, status=status.HTTP_200_OK)
        
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer}, request_body=CancelOrderSerializer)
@api_view(['POST'])
@permission_classes([IsAuthCustomer])
def customer_cancel_order(request):
    serializer = CancelOrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    order_id = serializer.validated_data['order_id']
    order = Order.objects.get(id=order_id)
    purchases = Purchase.objects.filter(order=order)

    for purchase in purchases:
        if purchase.status == 'Ccancelled':
            return Response(data={'error': 'Order is already cancelled by customer'}, status=status.HTTP_400_BAD_REQUEST) 
        elif purchase.status == 'Vcancelled':
            return Response(data={'error': 'Order is already cancelled by vendor'}, status=status.HTTP_400_BAD_REQUEST)
        elif purchase.status == 'Ship':
            return Response(data={'error': 'Order is already at shipment stage'}, status=status.HTTP_400_BAD_REQUEST)
        elif purchase.status == 'Delivered':
            return Response(data={'error': 'Order is already delivered by customer'}, status=status.HTTP_400_BAD_REQUEST)
        elif purchase.status == 'OrderTaken' or purchase.status == 'Preparing':
              purchase.status = 'Ccancelled'
              purchase.save()
              product_id = purchase.product_id
              product_amount = purchase.amount
              product = Product.objects.get(id=product_id)
              product.stock += product_amount
              product.number_of_sales -= product_amount
              product.save()
    
    return Response(data={'success': 'Order is successfully canceled.'}, status=status.HTTP_200_OK)
    