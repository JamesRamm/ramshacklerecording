import math
from django.conf import settings
from checkout.app_settings import CURRENCY
import stripe
from checkout.utils import PaymentError


class StripePayment():
    '''
    Create a payment using stripe
    '''
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET

    def create_payment(self, request, amount):
        try:
            charge = stripe.Charge.create(
                amount=int(math.ceil(amount * 100)),  # Amount in pence
                currency=CURRENCY.lower(),
                source=request.data['token'],
                description="Payment from"
            )
        except stripe.error.CardError as error:
            raise PaymentError(error)

    def get_token(self, request):
        ''' Create a stripe token for a card
        '''
        return stripe.Token.create(
            card={
                "number": request.data["number"],
                "exp_month": request.data["exp_month"],
                "exp_year": request.data["exp_year"],
                "cvc": request.data["cvc"]

            }
        )
