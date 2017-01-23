from rest_framework import serializers
from projects.models import Schematic


class SchematicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schematic
        fields = '__all__'
