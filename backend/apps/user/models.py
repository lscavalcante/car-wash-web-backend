from .manager import Manager
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import models


class User(AbstractUser):
    is_employee = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=255, null=True, blank=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = Manager()

    def get_tokens_for_user(self):
        refresh = RefreshToken.for_user(self)

        refresh.payload['email'] = self.email
        refresh.payload['is_employee'] = self.is_employee
        refresh.payload['is_client'] = self.is_client

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    class Meta:
        ordering = ['-id']


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self) -> str:
        return self.user.email


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self) -> str:
        return self.user.email
