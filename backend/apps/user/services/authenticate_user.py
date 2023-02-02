from django.utils import timezone
from rest_framework.exceptions import APIException, AuthenticationFailed
from django.contrib import auth

from apps.user.models import User


class AuthenticateUser:

    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password

    def run(self) -> User:
        try:

            user = auth.authenticate(email=self.email, password=self.password)

            if not user:
                raise AuthenticationFailed('Credencial inválida, tente novamente.')
            if not user.is_active:
                raise AuthenticationFailed('Conta desativada, entre em contato com o administrador.')

            user.last_login = timezone.now()

            user.save()

            return user
        except APIException as error:
            raise error
        except Exception as fatal_error:
            raise APIException(detail=fatal_error)
