from typing import Dict

from rest_framework.exceptions import ParseError

from apps.service.models import ServiceCategory, ServiceProvided, Service
from apps.user.models import User
from infra.generic_functions.get_or_none import get_or_none


class CreateServiceProvided:

    def __init__(self, user: User, validated_data: Dict):
        self.user = user
        self.validated_data = validated_data

    def run(self):
        service_category_id = self.validated_data.pop('service_category')
        service_id = self.validated_data.pop('service_id')

        service = get_or_none(Service, pk=service_id, raise_exception=True)
        service_category = get_or_none(ServiceCategory, pk=service_category_id)

        if service_category:
            service_provided = ServiceProvided.objects.create(
                created_by_id=self.user.id,
                service_category_id=service_category_id,
                title=service_category.title,
                price=service_category.price,
            )
            service.services.add(service_provided)
            service.save()

            return service_provided

        service_provided = ServiceProvided.objects.create(
            created_by_id=self.user.id,
            service_category_id=None,
            **self.validated_data,
        )

        service.services.add(service_provided)
        service.save()
        return service_provided
