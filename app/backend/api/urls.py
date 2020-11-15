from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.users import UserViewSet
from django.views.generic import TemplateView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    
    # Route TemplateView to serve Swagger UI template.
    path('docs/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
]