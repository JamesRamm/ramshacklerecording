from django.conf.urls import url
from django.conf import settings
from products import api

urlpatterns = [
    url(settings.API_URL_PREFIX + r'basket/(?P<variant_id>[0-9]+)/request/$',
        api.product_request,
        name="product_request"),
]