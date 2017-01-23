from django.conf import settings

PRODUCT_VARIANT_MODEL = settings.get('PRODUCT_VARIANT_MODEL', 'products.ProductVariant')