from django.db import models
from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField, StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel, StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtaildocs.edit_handlers import DocumentChooserPanel
from wagtail.wagtaildocs.blocks import DocumentChooserBlock
from wagtail.wagtailcore import blocks
from wagtail.wagtailimages.blocks import ImageChooserBlock

from longclaw.longclawproducts.models import Product
from wagtailmath.blocks import MathBlock

class ProjectIndex(Page):
    subpage_types = ["projects.Project"]

class SchematicIndex(Page):
    subpage_types = ["projects.Schematic"]

class ProjectProduct(models.Model):
    product = models.ForeignKey(Product, related_name="+")
    project = ParentalKey('Project', related_name="project_product_relationship")

    panels = [
        FieldPanel('product')
    ]

class ProjectTag(TaggedItemBase):
    content_object = ParentalKey('Project', related_name='tagged_items')

class Project(Page):
    parent_page_types = ["projects.ProjectIndex"]
    description = RichTextField(blank=True, null=True)
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
        ('document', DocumentChooserBlock()),
        ('equation', MathBlock())
    ])
    tags = ClusterTaggableManager(through=ProjectTag, blank=True)

    @property
    def products(self):
        products = [
            # Grabs rows from the relationship index and formats them correctly.
            # See the `PostCategoryRelationship` class below.
            n.products for n in self.project_product_relationship.all()
        ]
        return products

    # Only inline panels work here.
    content_panels = Page.content_panels + [
        FieldPanel('description'),
        StreamFieldPanel('body'),
        InlinePanel('project_product_relationship', label='products'),
        FieldPanel('tags'),
    ]

class SchematicTag(TaggedItemBase):
    content_object = ParentalKey('Schematic', related_name='tagged_items')

class Schematic(Page):
    parent_page_types = ["projects.SchematicIndex"]
    author = models.CharField(max_length=32, blank=True, null=True)
    company = models.CharField(max_length=32, blank=True, null=True)
    tags = ClusterTaggableManager(through=SchematicTag, blank=True)
    image = models.ForeignKey('wagtailimages.Image',
                              on_delete=models.SET_NULL,
                              related_name='+',
                              blank=True,
                              null=True)
    document = models.ForeignKey('wagtaildocs.Document',
                                 null=True,
                                 blank=True,
                                 on_delete=models.SET_NULL,
                                 related_name='+')

    ramshackle_project = models.ForeignKey('projects.Project',
                                           null=True,
                                           blank=True,
                                           related_name='schematics',
                                           on_delete=models.SET_NULL)

    schematic_url = models.URLField(blank=True, null=True)

    content_panels = Page.content_panels + [
        DocumentChooserPanel('document'),
        ImageChooserPanel('image'),
        FieldPanel('schematic_url'),
        FieldPanel("author"),
        FieldPanel("company"),
        FieldPanel('tags'),
    ]
