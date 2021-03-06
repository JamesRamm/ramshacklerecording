from __future__ import absolute_import, unicode_literals

from django.db import models

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel, PageChooserPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtaildocs.edit_handlers import DocumentChooserPanel
from wagtail.wagtailcore.fields import RichTextField


class HomePage(Page):

    cover_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    cover_text = models.CharField(max_length=255, blank=True)

    def get_context(self, request, *args, **kwargs):
        from longclaw.utils import maybe_get_product_model
        context = super(HomePage, self).get_context(request, *args, **kwargs)
        context['products'] = maybe_get_product_model().objects.all()
        return context

HomePage.content_panels = [
    FieldPanel('title', classname="full title"),
    ImageChooserPanel('cover_image'),
    FieldPanel('cover_text'),
    # InlinePanel('promoted_projects', label="Promoted Projects"),
    # InlinePanel('promoted_products', label="Promoted Products")
]

HomePage.promote_panels = Page.promote_panels


class PolicyIndex(Page):
    subpage_types = ('home.Policy',)

class Policy(Page):
    parent_page_types = ('home.PolicyIndex',)
    body = RichTextField()
    content_panels = Page.content_panels + [
        FieldPanel('body')
    ]

# class PromotedProject(Orderable):
#     project = models.ForeignKey(
#         'projects.Project',
#         null=True,
#         blank=True,
#         related_name='+'
#     )
#     page = ParentalKey('home.HomePage', related_name='promoted_projects')
#     panels = [
#         PageChooserPanel('project')
#     ]

# class PromotedProduct(Orderable):
#     # product = models.ForeignKey(
#     #     'longclawproducts.Product',
#     #     null=True,
#     #     blank=True,
#     #     related_name='+'
#     # )
#     page = ParentalKey('home.HomePage', related_name='promoted_products')
#     panels = [
#         PageChooserPanel('product')
#     ]
