from typing import Dict

from apps.user.models import User, Client
from apps.vehicle.models import Vehicle
from infra.generic_functions.get_or_none import get_or_none


class CreateVehicle:

    def __init__(self, user: User, validated_data: Dict):
        self.user = user
        self.validated_data = validated_data

    def run(self):
        client_id = self.validated_data.pop('owner')

        get_or_none(Client, pk=client_id, raise_exception=True)

        return Vehicle.objects.create(
            **self.validated_data,
            owner_id=client_id,
        )
