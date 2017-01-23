from django.db import models
from django_extensions.db.fields import AutoSlugField

from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailsearch import index

class ProductIndex(Page):
    pass

class ProductTag(TaggedItemBase):
    content_object = ParentalKey('Product', related_name='tagged_items')

class Product(Page):
    description = RichTextField()
    tags = ClusterTaggableManager(through=ProductTag, blank=True)

    search_fields = Page.search_fields + [
        index.RelatedFields('tags', [
            index.SearchField('name', partial_match=True, boost=10),
        ]),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('description'),
        InlinePanel('variants', label='Product variants'),
        InlinePanel('images', label='Product images'),
        FieldPanel('tags'),
    ]

    @property
    def first_image(self):
        return self.images.first()

    @property
    def price_range(self):
        ''' Calculate the price range of the products variants
        '''
        ordered = self.variants.order_by('price')
        if ordered:
            return ordered.first().price, ordered.last().price
        else:
            return None, None

    @property
    def in_stock(self):
        ''' Returns True if any of the product variants are in stock
        '''
        return any(self.variants.filter(stock__gt=0))

class ProductVariant(models.Model):
    page = ParentalKey(Product, related_name='variants')
    ref = models.CharField(max_length=32)
    description = RichTextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    stock = models.IntegerField(default=0)
    slug = AutoSlugField(
        separator='',
        populate_from=('page', 'ref'),
        )

    def get_product_title(self):
        return self.page.title

class ProductImage(Orderable):

    page = ParentalKey(Product, related_name='images')
    image = models.ForeignKey('wagtailimages.Image', on_delete=models.CASCADE, related_name='+')
    caption = models.CharField(blank=True, max_length=255)

    panels = [
        ImageChooserPanel('image'),
        FieldPanel('caption')
    ]
