from rest_framework import serializers
from products.models import ProductVariant, Product

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"


class ProductVariantSerializer(serializers.ModelSerializer):

    page = ProductSerializer()

    class Meta:
        model = ProductVariant
        fields = "__all__"
