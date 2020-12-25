  
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from ..models import Customer, Vendor
from ..models import Product
from ..models import TempUser
from ..models import Chat, Message

def create_user_account(email, username, first_name,
                        last_name, password, is_customer, is_vendor, address, **extra_fields):
    user = get_user_model().objects.create_user(
        email=email, username=username, first_name=first_name,
        last_name=last_name, password=password, is_customer= is_customer, is_vendor=is_vendor, address=address, **extra_fields)
    
    if is_customer:
        customer = Customer(user=user)
        customer.save()
    elif is_vendor:
        vendor = Vendor(user=user)
        vendor.save()
        

    return user


def create_product(name, price, stock, description, image_url, subcategory, vendor, brand, discount, **extra_fields):
    product = Product(name=name, price=price, stock=stock, description=description, image_url=image_url, 
                        subcategory=subcategory, vendor=vendor, brand=brand, discount=discount)
    product.save()

def create_temp_user_account(email, number, username, first_name,
                        last_name, password, is_customer, is_vendor, address, **extra_fields):
    temp_user = TempUser(
        email=email, number = number , username=username, first_name=first_name,
        last_name=last_name, password=password, is_customer= is_customer, is_vendor=is_vendor, address=address, **extra_fields)
    temp_user.save()

def send_email(template,to):
    index = 0
    while index < 5:
        try:
            #send_mail("Complete your signing up", template , "bupazar451@gmail.com", [validated['email']])
            send_mail("Complete your signing up", template , "bupazar451@gmail.com", [to])
            print("Email is sent")
            break
        except:
            index+=1  
    return index

def create_chat(customer_id, vendor_id):
    c = Chat(customer_id=customer_id, vendor_id=vendor_id)
    c.save()
    return c

def create_message(context, chat, whose_message=1):
    m = Message(context=context, chat=chat, whose_message=whose_message,)
    m.save()
    return m