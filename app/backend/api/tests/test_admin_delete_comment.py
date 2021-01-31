from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
import json
from django.contrib.auth import get_user_model
from ..serializers import AuthUserSerializer
from ..models import Admin, Comment, User, Category, SubCategory, Product, Customer, Vendor
comment_id = 1

vendor_user = None
purchase_id = None
price = 100
discount = 5
stock = 5
amount = 2
class AdminDeleteCommentTest(TestCase):


    def setUp(self):
        global comment_id
        global price, discount, stock, vendor_user
        self.client = APIClient()

        a = Admin.objects.create(email="bupazar451@gmail.com",username="admin")
        a.save()
        ua = User.objects.create(email="bupazar451@gmail.com",username="admin",first_name="admin",last_name="adminl",is_customer=False)
        ua.save()

        category = Category.objects.create(name='category_test')
        subcategory = SubCategory.objects.create(name='subcategory_test', category=category)
        vendor_user = get_user_model().objects.create_user(username='test_vendor', email='testvendor@test.com', password='Sifre123',
                                    first_name='Vendor', last_name='Test', is_vendor=True, address='Istanbul')
        vendor = Vendor.objects.create(user=vendor_user)
        product = Product.objects.create(name='Test Product', price=500, stock=stock, description='Test Description', 
                                        subcategory=subcategory, vendor=vendor, brand='TestBrand', discount=discount)
        customer_user = get_user_model().objects.create_user(username='test_customer', email='testcustomer@test.com', password='Sifre123',
                                    first_name='Customer', last_name='Test', is_customer=True, address='Istanbul')
        customer = Customer.objects.create(user=customer_user)

        comment = Comment.objects.create(customer=customer,product=product,comment_text="nice",rating_score=5,is_anonymous=False)
        comment_id = comment.id

    def test_admin_delete_comment(self):
        global comment_id
        admin_user = Admin.objects.get(email="bupazar451@gmail.com")
        ua = User.objects.get(email=admin_user.email)
        content = AuthUserSerializer(ua).data
        auth_token = content['auth_token']
        body = {
            "comment_id": comment_id
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        response = self.client.post("/api/admin/delete_comment/",body)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['success'], 'comment is deleted')
        is_found = False
        if Comment.objects.filter(id=comment_id):
            is_found = True
        self.assertFalse(is_found)
