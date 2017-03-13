from __future__ import absolute_import, unicode_literals

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '-b)$r4rivrz#67+3us^kl(ivwfuv)uve=z4cews6jroxqmgvkd'

# Braintree settings
BRAINTREE_MERCHANT_ID = 'wzj6jygytbsgrm7t'
BRAINTREE_PUBLIC_KEY = 'jqkky54x7yvgc33z'
BRAINTREE_PRIVATE_KEY = '1fde9600966db0ec880cb32f0e5f880d'

# Sandbox key for v.zero
VZERO_ACCESS_TOKEN = 'access_token$sandbox$j4gmmnvx842tt2yb$c537509b8ef378b6fa8bbb3a7ae7722c'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

try:
    from .local import *
except ImportError:
    pass
