  
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from ..models import Customer, Vendor
from ..models import Product, ProductInCart, ProductList, FavoriteList, Cart, NotificationType, Notification
from ..models import TempUser
from ..models import Chat, Message, UnreadMessages


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
            send_mail("Complete your signing up", template , "bupazar451@gmail.com", [to])
            print("Email is sent")
            break
        except:
            index+=1  
    return index

def create_chat(customer_username, vendor_username, product_id):
    c = Chat(customer_username=customer_username, vendor_username=vendor_username, product_id=product_id)
    c.save()
    return c

def create_message(content, chat, whose_message="customer"):
    m = Message(content=content, chat=chat, whose_message=whose_message)
    m.save()
    return m

def create_unread_message(chat_id, to_whom):
    k = UnreadMessages(chat_id=chat_id, to_whom=to_whom)
    k.save()
    return k

def is_found_a_chat(chat_id,usr):
    try:
        chat = None
        if usr.is_customer:
            chat = Chat.objects.get(id=chat_id, customer_username=usr.username)
        else:
            chat = Chat.objects.get(id=chat_id, vendor_username=usr.username)
        return chat
    except:
        return None


def stock_end_notifications(product):
    # in cart
    cart_ids = ProductInCart.objects.filter(product=product).values_list('cart')
    carts = Cart.objects.filter(pk__in=cart_ids)
    user_ids = carts.values_list('user')
    users = Customer.objects.filter(pk__in=user_ids)
    for user in users:
        new_notification = Notification(
            text=f'{product.name} in your cart is no longer in stock',
            notificationType=NotificationType.STOCK_ENDED.value,
            user=user.user, 
            product=product)       
        new_notification.save()
    # in favorites
    fav_lists_containing_product = FavoriteList.objects.filter(products__id=product.id)
    user_ids = fav_lists_containing_product.values_list('user')
    users = Customer.objects.filter(pk__in=user_ids)
    for user in users:
        new_notification = Notification(
            text=f'{product.name} from your favorites is no longer in stock',
            notificationType=NotificationType.STOCK_ENDED.value,
            user=user.user, 
            product=product)       
        new_notification.save()
    # in list
    lists_containing_product = ProductList.objects.filter(products__id=product.id)
    user_ids = lists_containing_product.values_list('user')
    users = Customer.objects.filter(pk__in=user_ids)
    for user in users:
        new_notification = Notification(
            text=f'{product.name} from your list is no longer in stock',
            notificationType=NotificationType.STOCK_ENDED.value,
            user=user.user, 
            product=product)       
        new_notification.save()

def stock_replenish_notifications(product):
    # in cart
    cart_ids = ProductInCart.objects.filter(product=product).values_list('cart')
    carts = Cart.objects.filter(pk__in=cart_ids)
    user_ids = carts.values_list('user')
    users = Customer.objects.filter(pk__in=user_ids)
    for user in users:
        new_notification = Notification(
            text=f'{product.name} in your cart is now in stock ',
            notificationType=NotificationType.STOCK_RENEWED.value,
            user=user.user, 
            product=product)       
        new_notification.save()
    # in favorites
    fav_lists_containing_product = FavoriteList.objects.filter(products__id=product.id)
    user_ids = fav_lists_containing_product.values_list('user')
    users = Customer.objects.filter(pk__in=user_ids)
    for user in users:
        new_notification = Notification(
            text=f'{product.name} from your favorites is now in stock',
            notificationType=NotificationType.STOCK_RENEWED.value,
            user=user.user, 
            product=product)       
        new_notification.save()
    # in list
    lists_containing_product = ProductList.objects.filter(products__id=product.id)
    user_ids = lists_containing_product.values_list('user')
    users = Customer.objects.filter(pk__in=user_ids)
    for user in users:
        new_notification = Notification(
            text=f'{product.name} from your list is now in stock',
            notificationType=NotificationType.STOCK_RENEWED.value,
            user=user.user, 
            product=product)       
        new_notification.save()

