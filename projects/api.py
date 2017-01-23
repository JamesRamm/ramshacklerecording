from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from projects.models import Schematic
from projects.serializers import SchematicSerializer


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def get_schematics(request):
    ''' Get all schematics
    '''
    queryset = Schematic.objects.all()
    serializer = SchematicSerializer(queryset, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)
