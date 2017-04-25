from django.db import models
from django.core.validators import MinValueValidator
from longclaw.longclawproducts.models import ProductVariantBase

class ProductVariant(ProductVariantBase):
    request_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
