from rest_framework import serializers
from ..models import Product, ProductList, Customer, Comment, Vendor, User, SubCategory, Category

#Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    vendor = serializers.SerializerMethodField('get_vendor')
    category = serializers.SerializerMethodField('get_category')
    subcategory = serializers.SerializerMethodField('get_subcategory')

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'stock', 'description', 'date_added', 'number_of_sales', 
                    'image_url', 'category', 'subcategory', 'vendor', 'total_rating_score', 'rating_count', 
                    'brand', 'discount', 'rating')

    def get_vendor(self, obj):
        vendor = User.objects.get(id=obj.vendor_id)
        return vendor.username

    def get_subcategory(self, obj):
        subcategory = SubCategory.objects.get(id=obj.subcategory_id)
        return subcategory.name

    def get_category(self, obj):
        subcategory = SubCategory.objects.get(id=obj.subcategory_id)
        category_id = subcategory.category_id
        category = Category.objects.get(id=category_id)
        return category.name 

class AddProductSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250, required=True)
    price = serializers.FloatField(required=True)
    stock = serializers.IntegerField(required=True)
    description = serializers.CharField(max_length=500, required=True)
    image_file = serializers.FileField(required=True)
    subcategory_name = serializers.CharField(max_length=250, required=True)
    brand = serializers.CharField(max_length=250, required=True)
    discount = serializers.FloatField(required=True)

class DeleteProductSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)

class UpdateProductSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)
    name = serializers.CharField(max_length=250, required=False)
    price = serializers.FloatField(required=False)
    stock = serializers.IntegerField(required=False)
    description = serializers.CharField(max_length=500, required=False)
    discount = serializers.FloatField(required=False)

#ProductList Serializer
class ProductListSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')
    products = serializers.SerializerMethodField('get_products')

    class Meta:
        model = ProductList
        fields = ('id', 'name', 'user', 'products')
    
    def get_user(self, obj):
        user = User.objects.get(id=obj.user_id)
        return user.username
    
    def get_products(self, obj):
        products = obj.products.all()
        content = ProductSerializer(products, many=True).data
        return content

class CreateProductListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250, required=True)

class DeleteProductListSerializer(serializers.Serializer):
    list_id = serializers.IntegerField(required=True)

class ProductListAddProductSerializer(serializers.Serializer):
    list_id = serializers.IntegerField(required=True)
    product_id = serializers.IntegerField(required=True)

class ProductListRemoveProductSerializer(serializers.Serializer):
    list_id = serializers.IntegerField(required=True)
    product_id = serializers.IntegerField(required=True)

class ResponseSerializer(serializers.Serializer):
    ok = serializers.BooleanField()
    message = serializers.CharField(max_length=250)

class ProductListResponseSerializer(ResponseSerializer):
    data = ProductListSerializer()
  
#Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField('get_customer')
    
    class Meta:
        model = Comment
        fields = ('id', 'customer', 'product', 'comment_text', 'rating_score', 'is_anonymous')

    def get_customer(self, obj):
        customer = User.objects.get(id=obj.customer_id)
        first_name, last_name = customer.first_name, customer.last_name
        if obj.is_anonymous:
            first_name = customer.first_name[0] + "*"*len(customer.first_name[1:])
            last_name = customer.last_name[0] + "*"*len(customer.last_name[1:])
            
        return first_name + " " + last_name

class ProductAddCommentSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)
    comment_text = serializers.CharField(max_length=250, required=True)
    is_anonymous = serializers.BooleanField(required=True)
    rating_score = serializers.IntegerField(max_value=5, min_value=0, required=True)

class ProductAllCommentsSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)

class CategoryProductsSeriazlier(serializers.Serializer):
    category_name = serializers.CharField(max_length=250, required=True)

class SubCategoryProductsSeriazlier(serializers.Serializer):
    subcategory_name = serializers.CharField(max_length=250, required=True)
    
class FilterProductSerializer(serializers.Serializer):
    product_ids = serializers.ListField(child = serializers.IntegerField()) 
    filter_data = serializers.ListField(child = serializers.DictField(child = serializers.CharField()))

class ProductSearchSerializer(serializers.Serializer):
    query = serializers.CharField(max_length=250, required=True)

class SortProductSerializer(serializers.Serializer):
    product_ids = serializers.ListField(child = serializers.IntegerField()) 
    sort_by = serializers.CharField(max_length=250, required=True)
    order = serializers.CharField(max_length=250, required=True)

class HomePageRequestSerializer(serializers.Serializer):
    number_of_products = serializers.IntegerField()

class HomePageResponseSerializer(serializers.Serializer):
    newest_arrivals = serializers.ListField(child = ProductSerializer())
    best_sellers = serializers.ListField(child = ProductSerializer())
    trends = serializers.ListField(child = ProductSerializer())
