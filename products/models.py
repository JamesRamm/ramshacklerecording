from django.db import models
from longclaw.longclawproducts.models import ProductVariantBase

class ProductVariant(ProductVariantBase):
    stock = models.IntegerField(default=0)
