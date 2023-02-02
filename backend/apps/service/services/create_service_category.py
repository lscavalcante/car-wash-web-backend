from typing import Dict

from apps.service.models import ServiceCategory
from apps.user.models import User
from apps.vehicle.models import Vehicle


class CreateServiceCategory:

    def __init__(self, user: User, validated_data: Dict):
        self.user = user
        self.validated_data = validated_data

    def run(self):
        return ServiceCategory.objects.create(
            **self.validated_data,
            created_by_id=self.user.id,
        )
