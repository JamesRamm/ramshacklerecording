from django.conf import settings

PRODUCT_VARIANT_MODEL = getattr(settings, 'PRODUCT_VARIANT_MODEL', 'products.ProductVariant')