from rest_framework.exceptions import ParseError

from apps.service.models import ServiceCategory, ServiceProvided
from apps.user.models import User


class UpdateServiceProvided:

    def __init__(self, user: User, service_provided: ServiceProvided, **validated_data):
        self.validated_data = validated_data
        self.user = user
        self.service_provided = service_provided

    def run(self):
        try:
            validated_field = ['title', 'price']

            for field in validated_field:
                if field in self.validated_data:
                    setattr(self.service_provided, field, self.validated_data[field])

            self.service_provided.updated_by_id = self.user.id
            self.service_provided.save()

            return self.service_provided
        except Exception as e:
            raise ParseError(detail=e)
