from rest_framework import serializers

from products.serializers import ProductVariantSerializer
from basket.models import BasketItem

class BasketItemSerializer(serializers.ModelSerializer):

    product = ProductVariantSerializer()
    price = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = BasketItem
        fields = "__all__"

    def get_price(self, obj):
        return obj.price()

    def get_total(self, obj):
        return obj.total()
    