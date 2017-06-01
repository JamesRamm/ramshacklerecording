from __future__ import absolute_import, unicode_literals
import os
from .base import *

ENV = os.environ.copy()
SECRET_KEY = ENV.get('SECRET_KEY')
DEBUG = False

# db_from_env = dj_database_url.config()
# DATABASES['default'].update(db_from_env)

VZERO_ACCESS_TOKEN = ENV.get('VZERO')

AWS_HEADERS = {
    'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',
    'Cache-Control': 'max-age=3600',
}

# Amazon Web Services settings
AWS_S3_ACCESS_KEY_ID = ENV.get("S3_ID")
AWS_S3_SECRET_ACCESS_KEY = ENV.get("S3_SECRET")
AWS_STORAGE_BUCKET_NAME = "ramshackleaudio"

# Tell django-storages that when coming up with the URL for an item in S3 storage, keep
# it simple - just use this domain plus the path. (If this isn't set, things get complicated).
# This controls how the `static` template tag from `staticfiles` gets expanded, if you're using it.
# We also use it in the next setting.
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME

STATICFILES_LOCATION = 'static'
STATICFILES_STORAGE = 'ramshackleaudio.s3utils.StaticStorage'
STATIC_URL = "http://%s/%s/" % (AWS_S3_CUSTOM_DOMAIN, STATICFILES_LOCATION)

MEDIAFILES_LOCATION = 'media'
MEDIA_URL = "http://%s/%s/" % (AWS_S3_CUSTOM_DOMAIN, MEDIAFILES_LOCATION)
DEFAULT_FILE_STORAGE = 'ramshackleaudio.s3utils.MediaStorage'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "ramshacklerecording@gmail.com"
EMAIL_HOST_PASSWORD = ENV.get("GMAIL_PASSWORD")
EMAIL_PORT = 587
SERVER_EMAIL = "ramshacklerecording@gmail.com"
DEFAULT_FROM_EMAIL = "ramshacklerecording@gmail.com"
DEFAULT_TO_EMAIL = "ramshacklerecording@gmail.com"

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS=["*"]

try:
    from .local import *
except ImportError:
    pass
