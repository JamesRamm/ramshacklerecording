from django.db import models
from django.conf import settings
from products.models import ProductVariant

PRODUCT_VARIANT_MODEL = getattr(settings, 'PRODUCT_VARIANT_MODEL', 'products.ProductVariant')

class BasketItem(models.Model):
    basket_id = models.CharField(max_length=32)
    date_added = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField(default=1)
    product = models.ForeignKey(PRODUCT_VARIANT_MODEL, unique=False)

    class Meta:
        ordering = ['date_added']

    def total(self):
        return self.quantity * self.product.price

    def name(self):
        return "{} ({})".format(self.product.page.title, self.product.ref)

    def price(self):
        return self.product.price

    def increase_quantity(self, quantity=1):
        ''' Increase the quantity of this product in the basket
        '''
        self.quantity += quantity
        self.save()

    def decrease_quantity(self, quantity=1):
        '''
        '''
        self.quantity -= quantity
        if self.quantity <= 0:
            self.delete()
        else:
            self.save()

