from django.db import models
from django.utils.encoding import python_2_unicode_compatible

from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore import blocks
from wagtail.wagtaildocs.blocks import DocumentChooserBlock
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel, StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtaildocs.edit_handlers import DocumentChooserPanel
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel


from wagtailmath.blocks import MathBlock

class ProjectIndex(Page):
    subpage_types = ["projects.Project"]

class ProjectProduct(models.Model):
    product = models.ForeignKey('products.Product', related_name="+")
    project = ParentalKey('Project', related_name="project_product_relationship")

    panels = [
        FieldPanel('product')
    ]

class ProjectTag(TaggedItemBase):
    content_object = ParentalKey('Project', related_name='tagged_items')

class Project(Page):
    parent_page_types = ["projects.ProjectIndex"]
    tagline = models.CharField(max_length=128, blank=True, null=True)
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
        ('document', DocumentChooserBlock()),
        ('equation', MathBlock())
    ])

    octopart_bom = models.URLField(blank=True, null=True)
    tags = ClusterTaggableManager(through=ProjectTag, blank=True)

    @property
    def products(self):
        products = [
            # Grabs rows from the relationship index and formats them correctly.
            n.products for n in self.project_product_relationship.all()
        ]
        return products

    # Only inline panels work here.
    content_panels = Page.content_panels + [
        FieldPanel('tagline'),
        StreamFieldPanel('body'),
        FieldPanel('octopart_bom'),
        InlinePanel('project_product_relationship', label='products'),
        InlinePanel('schematics', label='schematics'),
        FieldPanel('tags'),
    ]

@register_snippet
@python_2_unicode_compatible
class Schematic(models.Model):
    name = models.CharField(max_length=32)
    author = models.CharField(max_length=32, blank=True, null=True)
    company = models.CharField(max_length=32, blank=True, null=True)
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

    schematic_url = models.URLField(blank=True, null=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('author'),
        FieldPanel('company'),
        ImageChooserPanel('image'),
        DocumentChooserPanel('document'),
        FieldPanel('schematic_url')
    ]

    def __str__(self):
        return self.name


class ProjectSchematic(Orderable, models.Model):
    project = ParentalKey(Project, related_name="schematics")
    schematic = models.ForeignKey(Schematic, related_name='+')
    panels = [
        SnippetChooserPanel('schematic'),
    ]

    def __str__(self):
        return self.project.title + " -> " + self.schematic.name
