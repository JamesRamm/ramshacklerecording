from __future__ import absolute_import, unicode_literals

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '-b)$r4rivrz#67+3us^kl(ivwfuv)uve=z4cews6jroxqmgvkd'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

BRAINTREE_MERCHANT_ID = os.environ['BRAINTREE_MERCHANT_ID']
BRAINTREE_PUBLIC_KEY = os.environ['BRAINTREE_PUBLIC_KEY']
BRAINTREE_PRIVATE_KEY = os.environ['BRAINTREE_PRIVATE_KEY']

try:
    from .local import *
except ImportError:
    pass
