from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from ..serializers import VendorInfoRequestSerializer, VendorInfoResponseSerializer, ProductSerializer
from ..models import User, Product, Vendor, VendorRating

@swagger_auto_schema(method='post', responses={status.HTTP_200_OK: VendorInfoResponseSerializer}, request_body=VendorInfoRequestSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def get_vendor_details(request):
    serializer = VendorInfoRequestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    vendor_username = serializer.validated_data['vendor_username']
    user = User.objects.filter(username__iexact=vendor_username).first()
    if user:
        vendor = Vendor.objects.get(user=user)
        vendor_products = Product.objects.filter(vendor=vendor)

        rating, total_rating = (0, 0)
        vendor_ratings = VendorRating.objects.filter(vendor=vendor)
        for vendor_rating in vendor_ratings:
            total_rating += vendor_rating.rating_score
        
        if len(vendor_ratings) > 0:
            rating = round(total_rating / len(vendor_ratings), 1)
        
        data = {
            'email': user.email,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'address': user.address,
            'rating': rating,
            'products': ProductSerializer(vendor_products, many=True).data
        }

        return Response(data=data, status=status.HTTP_200_OK)
    else:
        return Response(data={'error': False}, status=status.HTTP_400_BAD_REQUEST)
