from rest_framework import serializers

from apps.vehicle.models import Vehicle


class ListVehicleSerializer(serializers.ModelSerializer):
    owner_email = serializers.CharField(source='owner.user.email')
    owner_full_name = serializers.CharField(read_only=True)

    class Meta:
        exclude = []
        model = Vehicle


class DetailVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Vehicle


class CreateVehicleSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    board = serializers.CharField(max_length=8)
    year = serializers.IntegerField()
    washes = serializers.IntegerField(default=0)
    fix = serializers.IntegerField(default=0)
    owner = serializers.IntegerField()


class UpdateVehicleSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    board = serializers.CharField(max_length=8)
    year = serializers.IntegerField()
    owner = serializers.IntegerField()
