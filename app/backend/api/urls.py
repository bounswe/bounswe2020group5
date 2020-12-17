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
router.register(r'comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(router.urls)),
    path('swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('products/<int:pk>/', product_detail),
    path('products/', get_products),
    path('products/category/', get_category_products),
    path('products/subcategory/', get_subcategory_products),
]