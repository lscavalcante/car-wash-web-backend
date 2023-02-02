from typing import Dict, List
from django.db.models import Q

from apps.service.models import ServiceCategory, ServiceProvided, Service
from apps.user.models import User, Employee
from infra.generic_functions.get_or_none import get_or_none


class UpdateService:

    def __init__(self, user: User, service_id, validated_data: Dict):
        self.user = user
        self.validated_data = validated_data
        self.client = None
        self.service_id = service_id

    def disable_services_provided_that_are_not_in_the_json(self, services_provided: List[dict]):
        ids = [sub.get('id', None) for sub in services_provided]

        service: Service = Service.objects.get(pk=self.service_id)
        # SQL Sintaxe not int
        services_provided_for_disable: List[ServiceProvided] = service.services.filter(~Q(pk__in=ids), Q(deleted=False))

        for temporary_service_provided in services_provided_for_disable:
            temporary_service_provided.deleted = True
            temporary_service_provided.save()

    def run(self):
        services_provided = self.validated_data.pop('services', None)

        get_or_none(
            Employee,
            pk=self.user.pk,
            raise_exception=True,
            detail=f'Only employee are authorization for created a service'
        )

        service = get_or_none(
            Service,
            pk=self.service_id,
            raise_exception=True,
            detail='Service not found'
        )

        for service_provided in services_provided:
            if service_provided.get('service_category') is not None:
                get_or_none(
                    ServiceCategory,
                    pk=service_provided.get('service_category'),
                    raise_exception=True,
                    detail=f'Service category id {service_provided.get("service_category")} not found'
                )

        self.disable_services_provided_that_are_not_in_the_json(services_provided)
        # Update service provided
        for validated_data_service_provided in services_provided:
            validated_field = ['title', 'price']

            if validated_data_service_provided.get('id') is not None:
                # atualizo
                instance = get_or_none(ServiceProvided, pk=validated_data_service_provided.get('id'))
                for field in validated_field:
                    if field in validated_data_service_provided:
                        setattr(instance, field, validated_data_service_provided[field])
                instance.service_category_id = validated_data_service_provided.get('service_category')
                instance.save()
            else:
                instance_service_category = get_or_none(
                    ServiceCategory,
                    pk=validated_data_service_provided.get('service_category')
                )
                if instance_service_category:
                    instance_service_provided = ServiceProvided.objects.create(
                        created_by_id=self.user.id,
                        service_category_id=instance_service_category.id,
                        title=instance_service_category.title,
                        price=instance_service_category.price,
                    )
                    service.services.add(instance_service_provided)
                else:
                    validated_data_service_provided.pop('id', None)
                    validated_data_service_provided.pop('service_category', None)
                    instance_service_provided = ServiceProvided.objects.create(
                        created_by_id=self.user.id,
                        service_category_id=None,
                        **validated_data_service_provided,
                    )
                    service.services.add(instance_service_provided)

                service.save()
                service.created_by_id = self.user.id

        validated_field = ['title', 'date_start', 'date_end', 'finish']
        for field in validated_field:
            if field in self.validated_data:
                setattr(service, field, self.validated_data[field])

        service.updated_by_id = self.user.id
        service.save()

        return service
