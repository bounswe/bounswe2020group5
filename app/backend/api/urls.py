from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="bupazar API",
      default_version='v1',
      description="bupazar description",
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'products/opts', ProductOptViewSet, basename='products/opts')
router.register(r'product-lists', ProductListViewSet, basename='product-lists')
router.register(r'product-lists/opts', ProductListOptViewSet, basename='product-lists/opts')
router.register(r'favorites', FavoritesViewSet, basename='favorites')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'credit-cards', CreditCardViewSet, basename='credit-cards')
router.register(r'credit-cards/opts', CreditCardOptsViewSet, basename='credit-cards/opts')
router.register(r'purchases', PurchaseViewSet, basename='purchases')
router.register(r'orders', PurchaseOptsViewSet, basename='orders')
router.register(r'chats', ChatViewSet, basename='chats')


urlpatterns = [
    path('', include(router.urls)),
    path('swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('products/<int:pk>/', product_detail),
    path('products/', get_products),
    path('products/category/', get_category_products),
    path('products/subcategory/', get_subcategory_products),
    path('products/filter/', filter_products),
    path('products/search/', search_products),
    path('products/sort/', sort_products),
    path('products/homepage/', get_homepage_products),
    path('products/vendor-products/', get_vendor_products),
    path('orders/vendor-orders/', get_vendor_purchases),
    path('orders/vendor-cancel/', vendor_cancel_purchase),
    path('orders/customer-cancel/', customer_cancel_order),
]