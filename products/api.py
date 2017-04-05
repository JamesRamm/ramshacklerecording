from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from products.models import ProductVariant

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def product_request(request, variant_id=None):
    '''
    Post a product request
    '''
    try:
        variant = ProductVariant.objects.get(id=variant_id)
        variant.request_count += 1
        variant.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ProductVariant.DoesNotExit:
        raise ValidationError(detail="Unknown variant id")
