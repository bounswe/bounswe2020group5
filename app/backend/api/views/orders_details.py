from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from ..custom_permissions import IsAuthCustomer, IsAuthVendor
from ..serializers import CancelOrderSerializer, CancelPurchaseSerializer, SuccessSerializer, PurchaseSerializer, UpdateStatusSerializer
from ..serializers import CustomerPurchasedSerializer, MessageResponseSerializer, CustomerOrderSerializer
from ..serializers import AddVendorRatingSerializer, VendorRatingSerializer, VendorRatingInProductPageSerializer, VendorRatingResponseSerializer
from ..serializers import ShipmentSerializer, AddShipmentSerializer, ShipmentCargoNoSerializer, GetShipmentSerializer
from ..models import Product, Order, Purchase, Customer, Vendor, VendorRating, Notification, NotificationType, User, Shipment
from ..utils import stock_end_notifications, stock_replenish_notifications
from rest_framework.response import Response
import string, random

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: PurchaseSerializer(many=True)})
@api_view(['GET'])
@permission_classes([IsAuthVendor])
def get_vendor_purchases(request):
    vendor = Vendor.objects.get(user=request.user)
    purchases = Purchase.objects.filter(vendor=vendor)
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
        stock_before = product.stock
        product.stock += product_amount
        if stock_before == 0 and product.stock > 0:
            stock_replenish_notifications(product)
        product.number_of_sales -= product_amount
        product.save()
        # Create a notification to customer when an order is cancelled by the vendor
        order = Order.objects.get(id=purchase.order_id)
        text = f'The {product.name} in your order {order.id} is cancelled by the vendor.'
        notification_type = NotificationType.ORDER_STATUS_CHANGED
        user = User.objects.get(id=purchase.customer_id)
        cancel_notification = Notification(text=text, notificationType=notification_type.value, user=user, product=product, order=order)
        cancel_notification.save()

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
        if purchase.status == 'OrderTaken' or purchase.status == 'Preparing':
            purchase.status = 'Ccancelled'
            purchase.save()
            product_id = purchase.product_id
            product_amount = purchase.amount
            product = Product.objects.get(id=product_id)
            stock_before = product.stock
            product.stock += product_amount
            if stock_before == 0 and product.stock > 0:
                stock_replenish_notifications(product)
            product.number_of_sales -= product_amount
            product.save()
        else:
            continue
    
    return Response(data={'success': 'Order is successfully canceled.'}, status=status.HTTP_200_OK)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: CustomerOrderSerializer})
@api_view(['GET'])
@permission_classes([IsAuthCustomer])
def get_customer_orders(request):
    customer = Customer.objects.get(user=request.user)
    my_orders = Order.objects.filter(customer=customer)
    my_orders = my_orders.order_by('-date')
    order_list = []
    for order in my_orders:
        content = {}
        content['order_id'] = order.id
        queryset = Purchase.objects.filter(order=order)
        content['purchases'] = PurchaseSerializer(queryset, many=True).data
        order_list.append(content)
        
    return Response(data=order_list, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: SuccessSerializer}, request_body=UpdateStatusSerializer)
@api_view(['POST'])
@permission_classes([IsAuthVendor])
def vendor_update_status(request):
    serializer = UpdateStatusSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    purhcase_id = serializer.validated_data['purchase_id']
    new_status = serializer.validated_data['status']
    purchase = Purchase.objects.get(id=purhcase_id)
    if purchase.status == 'Ccancelled' or purchase.status == 'Vcancelled':
        return Response(data={'error': 'Order is cancelled.'}, status=status.HTTP_400_BAD_REQUEST)
    if purchase.status != new_status:
        purchase.status = new_status
        purchase.save()
        # Create a new notification for the customer when the status of an order is changed by the vendor.
        text = ""
        order = Order.objects.get(id=purchase.order_id)
        if new_status == 'OrderTaken':
            text = "Your order is taken by the vendor."
        elif new_status == 'Preparing':
            text = f'The {purchase.product.name} in your order {order.id} is in preparation phase.'
        elif new_status == 'Ship':
            text = f'The {purchase.product.name} in your order {order.id} is shipped by the vendor.'
        elif new_status == 'Delivered':
            text = f'The {purchase.product.name} in your order {order.id} is delivered. Have a nice day.'
        notification_type = NotificationType.ORDER_STATUS_CHANGED
        user = User.objects.get(id=purchase.customer_id)
        status_change_notification = Notification(text=text, notificationType=notification_type.value, user=user, product=purchase.product, order=order)
        status_change_notification.save()
    return Response(data={'success': 'Order status is successfully updated.'}, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: MessageResponseSerializer}, request_body=CustomerPurchasedSerializer)
@api_view(['POST'])
@permission_classes([IsAuthCustomer])
def customer_purchased(request):
    serializer = CustomerPurchasedSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    product_id = serializer.validated_data['product_id']
    customer = Customer.objects.get(user=request.user)
    purchases = Purchase.objects.filter(customer=customer, product_id=product_id)
    for purchase in purchases:
        if not(purchase.status == 'Ccancelled' or purchase.status == 'Vcancelled'):
            return Response(data={'message': True}, status=status.HTTP_200_OK)
    return Response(data={'message': False}, status=status.HTTP_200_OK)

# This function allows customers to give rating score to vendors
# If no rating is given before, creates a new VendorRating entry in the table
# Otherwise, updates the corresponding entry
@swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: SuccessSerializer}, request_body=AddVendorRatingSerializer)
@api_view(['POST'])
@permission_classes([IsAuthCustomer])
def add_vendor_rating(request):
    serializer = AddVendorRatingSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    purchase_id = serializer.validated_data['purchase_id']
    rating_score = serializer.validated_data['rating_score']
    purchase = Purchase.objects.get(id=purchase_id)
    # Allow customer to give rating to a vendor if the order is delivered
    if purchase.status == 'Delivered':
        vendor_rating = VendorRating(vendor=purchase.vendor, rating_score=rating_score)
        vendor_rating.save()
        return Response(data={'success': 'Vendor rating is successfully given.'}, status=status.HTTP_201_CREATED)
    else:
        return Response(data={'error': 'Vendor rating cannot be given.'}, status=status.HTTP_400_BAD_REQUEST)
    
# This function allows displaying average rating of the vendor in product pages
# Depending on the product_id, it retrieves the corresponding VendorRating
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: VendorRatingResponseSerializer}, request_body=VendorRatingInProductPageSerializer)
@api_view(['POST'])
@permission_classes([])
def avg_vendor_rating_product_page(request):
    serializer = VendorRatingInProductPageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    product_id = serializer.validated_data['product_id']
    product = Product.objects.get(id=product_id)
    # If no vendor rating is given, return 0 as response
    vendor_ratings = VendorRating.objects.filter(vendor=product.vendor)
    total_rating = 0
    number_of_rates = 0
    if len(vendor_ratings) == 0:
        number_of_rates = 1
    else:
        for vendor_rating in vendor_ratings:
            total_rating += vendor_rating.rating_score
            number_of_rates += 1
    avg_score = round(total_rating / number_of_rates, 1)
    return Response(data={'score': avg_score}, status=status.HTTP_200_OK)

# This function allows displaying average rating of the vendor in product pages
# Depending on the requested vendor user, it retrieves the corresponding VendorRating
@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: VendorRatingResponseSerializer})
@api_view(['POST'])
@permission_classes([IsAuthVendor])
def avg_vendor_rating_profile_page(request):
    vendor = Vendor.objects.get(user=request.user)
    # If no vendor rating is given, return 0 as response
    vendor_ratings = VendorRating.objects.filter(vendor=vendor)
    total_rating = 0
    number_of_rates = 0
    if len(vendor_ratings) == 0:
        number_of_rates = 1
    else:
        for vendor_rating in vendor_ratings:
            total_rating += vendor_rating.rating_score
            number_of_rates += 1
    avg_score = round(total_rating / number_of_rates, 1)
    return Response(data={'score': avg_score}, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: ShipmentCargoNoSerializer}, request_body=AddShipmentSerializer)
@api_view(['POST'])
@permission_classes([IsAuthVendor])
def add_shipment(request):
    serializer = AddShipmentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    purchase_id = serializer.validated_data['purchase_id']
    cargo_company = serializer.validated_data['cargo_company']
    purchase = Purchase.objects.get(id=purchase_id)
    if purchase.status == "Preparing":
        cargo_no = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
        shipment = Shipment(purchase=purchase, cargo_no=cargo_no, cargo_company=cargo_company)
        shipment.save()
        return Response(data={'cargo_no': cargo_no}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(data={'error': 'Unable to ship this order.'}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: ShipmentSerializer}, request_body=GetShipmentSerializer)
@api_view(['POST'])
@permission_classes([IsAuthCustomer])
def get_shipment(request):
    serializer = GetShipmentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    purchase_id = serializer.validated_data['purchase_id']
    shipment = Shipment.objects.get(purchase_id=purchase_id)
    shipment_contents = ShipmentSerializer(shipment)
    return Response(data=shipment_contents.data, status=status.HTTP_200_OK)