import json
from ..models import TempUser, User, Chat
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from ..serializers import AuthUserSerializer
from ..models import Admin, Comment, User, Category, SubCategory, Product, Customer, Vendor
comment_id = 1
customer_id = 1
vendor_username = ""
product_id = 1
vendor_user = None
purchase_id = None
price = 100
discount = 5
stock = 5
amount = 2
class CreateChatTestCase(APITestCase):

    def setUp(self):
        global comment_id, vendor_username, product_id
        global price, discount, stock, vendor_user, user_id
        self.client = APIClient()


        category = Category.objects.create(name='category_test')
        subcategory = SubCategory.objects.create(name='subcategory_test', category=category)
        vendor_user = get_user_model().objects.create_user(username='test_vendor', email='testvendor@test.com', password='Sifre123',
                                    first_name='Vendor', last_name='Test', is_vendor=True, address='Istanbul')
        vendor = Vendor.objects.create(user=vendor_user)
        vendor_username = vendor.user.username
        product = Product.objects.create(name='Test Product', price=500, stock=stock, description='Test Description', 
                                        subcategory=subcategory, vendor=vendor, brand='TestBrand', discount=discount)
        product_id = product.id
        customer_user = get_user_model().objects.create_user(username='mrvyldm2', email='mrvyldm2@mailpoof.com', password='Sifre123',
                                    first_name='Customer', last_name='Test', is_customer=True, address='Istanbul')
        customer = Customer.objects.create(user=customer_user)
        customer_id = customer.user.id

    def test_create_chat(self):
        global vendor_username, product_id
        usr = User.objects.get(email="mrvyldm2@mailpoof.com")
        content = AuthUserSerializer(usr).data
        auth_token = content['auth_token']
        body = {
            "vendor_username" : vendor_username,            
            "product_id": product_id
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
        chat = Chat.objects.filter(vendor_username=vendor_username,product_id=product_id)
        is_found = False
        if chat:
            is_found = True
        self.assertFalse(is_found)
        response = self.client.post("/api/chats/create_chat/",body)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        chat = Chat.objects.filter(vendor_username=vendor_username,product_id=product_id)
        if chat:
            is_found = True
        self.assertTrue(is_found)