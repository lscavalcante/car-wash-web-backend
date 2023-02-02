from rest_framework.exceptions import ParseError

from apps.service.models import ServiceCategory
from apps.user.models import User


class UpdateServiceCategory:

    def __init__(self, user: User, service_category: ServiceCategory, **validated_data):
        self.validated_data = validated_data
        self.user = user
        self.service_category = service_category

    def run(self):
        try:
            validated_field = ['title', 'price']

            for field in validated_field:
                if field in self.validated_data:
                    setattr(self.service_category, field, self.validated_data[field])

            self.service_category.updated_by_id = self.user.id
            self.service_category.save()

            return self.service_category
        except Exception as e:
            raise ParseError(detail=e)
