from django.db import models
from longclaw.longclawproducts.models import ProductVariantBase, Product

from wagtail.wagtailadmin.edit_handlers import FieldPanel

class ProductVariant(ProductVariantBase):
    stock = models.IntegerField(default=0)
    request_count = models.IntegerField(default=0)
