from django.conf.urls import url
from projects import api

urlpatterns = [
    url(r'schematics/$',
        api.get_schematics,
        name="schematics_list"),
]