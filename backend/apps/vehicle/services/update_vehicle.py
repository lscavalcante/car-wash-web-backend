from rest_framework.exceptions import ParseError

from apps.service.models import ServiceCategory
from apps.user.models import User
from apps.vehicle.models import Vehicle


class UpdateVehicle:

    def __init__(self, user: User, instance: Vehicle, **validated_data):
        self.validated_data = validated_data
        self.user = user
        self.instance = instance

    def _update_vehicle(self):
        validated_field = ['name', 'board', 'year']

        for field in validated_field:
            if field in self.validated_data:
                setattr(self.instance, field, self.validated_data[field])

        self.instance.updated_by_id = self.user.id
        self.instance.owner_id = self.validated_data.get('owner')
        self.instance.save()

        return self.instance

    def run(self):
        try:
            if not User.objects.filter(id=self.validated_data.get('owner'), is_client=True).exists():
                raise ParseError(detail='Id client not found, try again with a new id')

            self._update_vehicle()

            return self.instance
        except Exception as e:
            raise ParseError(detail=e)
