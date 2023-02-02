from typing import Dict

from rest_framework.exceptions import ParseError

from apps.service.models import ServiceCategory, ServiceProvided, Service
from apps.service.services.create_service_provided import CreateServiceProvided
from apps.user.models import User, Client, Employee
from apps.vehicle.models import Vehicle
from infra.generic_functions.get_or_none import get_or_none


class CreateService:

    def __init__(self, user: User, validated_data: Dict):
        self.user = user
        self.validated_data = validated_data
        self.client = None

    def run(self):
        vehicle_id = self.validated_data.pop('vehicle')
        client_id = self.validated_data.pop('client')
        services_provided = self.validated_data.pop('services')

        if get_or_none(Employee, pk=self.user.pk) is None:
            raise ParseError(detail=f'Only employee are authorization for created a service')

        if get_or_none(Client, pk=client_id) is None:
            raise ParseError(detail=f'Client id {client_id} not found')

        if get_or_none(Vehicle, pk=vehicle_id) is None:
            raise ParseError(detail=f'Vehicle id {vehicle_id} not found')

        for service_provided in services_provided:
            if service_provided.get('service_category') is not None:
                if get_or_none(ServiceCategory, pk=service_provided.get('service_category')) is None:
                    raise ParseError(detail=f'Service category id {service_provided.get("service_category")} not found')

        instance_service = Service.objects.create(
            vehicle_id=vehicle_id,
            created_by_id=self.user.pk,
            client_id=client_id,
            **self.validated_data
        )

        for service_provided in services_provided:
            instance_service_provided = None
            instance_service_category = get_or_none(ServiceCategory, pk=service_provided.get('service_category'))
            if instance_service_category:
                instance_service_provided = ServiceProvided.objects.create(
                    created_by_id=self.user.id,
                    service_category_id=instance_service_category.id,
                    title=instance_service_category.title,
                    price=instance_service_category.price,
                )
            else:
                instance_service_provided = ServiceProvided.objects.create(
                    created_by_id=self.user.id,
                    service_category_id=None,
                    **service_provided,
                )

            instance_service.services.add(instance_service_provided)
            instance_service.save()

        return instance_service
