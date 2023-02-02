from rest_framework.exceptions import ParseError

from apps.user.models import User


class UpdateUser:

    def __init__(self, user: User, **validated_data):
        self.validated_data = validated_data
        self.user = user

    def run(self):
        try:
            validated_field = ['cpf', 'last_name', 'first_name']

            for field in validated_field:
                if field in self.validated_data:
                    setattr(self.user, field, self.validated_data[field])
            self.user.save()

            return self.user
        except Exception as e:
            raise ParseError(detail=e)
