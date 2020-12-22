from rest_framework.permissions import BasePermission

class IsAuthCustomer(BasePermission):
    """
    Allows access only to authenticated customers.
    """

    def has_permission(self, request, view):
        return (bool(request.user and request.user.is_authenticated) and request.user.is_customer)

class IsAuthVendor(BasePermission):
    """
    Allows access only to authenticated vendors.
    """

    def has_permission(self, request, view):
        return (bool(request.user and request.user.is_authenticated) and request.user.is_vendor)
        