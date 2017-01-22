from rest_framework import serializers

from products.serializers import ProductVariantSerializer
from checkout.models import ShippingCountry

class ShippingCountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingCountry
        fields = "__all__"

    