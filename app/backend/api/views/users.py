from django.contrib.auth.models import User
from api.serializers.users import UserSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer