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
                    'image_url', 'category', 'subcategory', 'vendor', 'total_rating_score', 'rating_count', 'comments')

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
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    stock = serializers.IntegerField(required=True)
    description = serializers.CharField(max_length=500, required=True)
    image_file = serializers.FileField(required=True)
    subcategory_name = serializers.CharField(max_length=250, required=True)

class DeleteProductSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)

#ProductList Serializer
class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductList
        fields = '__all__'

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
    ok = serializers.CharField(max_length=200)
  
#Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ProductAddCommentSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)
    comment_text = serializers.CharField(max_length=250, required=True)
    is_anonymous = serializers.BooleanField(required=True)

class ProductAddRatingSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=True)
    rating_score = serializers.IntegerField(max_value=5, min_value=0, required=True)

class CategoryProductsSeriazlier(serializers.Serializer):
    category_name = serializers.CharField(max_length=250, required=True)

class SubCategoryProductsSeriazlier(serializers.Serializer):
    subcategory_name = serializers.CharField(max_length=250, required=True)
    