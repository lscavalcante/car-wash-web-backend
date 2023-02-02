from django.db import models
from secrets import token_hex
from datetime import datetime

from apps.vehicle.models import Vehicle
from ..user.models import *


class ServiceCategory(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True,
                                   related_name='service_category_created_by')
    updated_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True,
                                   related_name='service_category_updated_by')

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title


class ServiceProvided(models.Model):
    service_category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True,
                                   related_name='service_provided_created_by')
    updated_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True,
                                   related_name='service_provided_updated_by')
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=255)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_by = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='service_created_by', blank=True,
                                   null=True)
    updated_by = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='service_updated_by', blank=True,
                                   null=True)
    date_start = models.DateTimeField(auto_now_add=True)
    date_end = models.DateTimeField(auto_now_add=True)
    finish = models.BooleanField(default=False)
    protocol = models.CharField(max_length=52, null=True, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.DO_NOTHING)
    services = models.ManyToManyField(ServiceProvided)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.protocol:
            self.protocol = datetime.now().strftime("%d/%m/%Y-%H:%M:%S-") + token_hex(16)
        super(Service, self).save(*args, **kwargs)

    @property
    def services_price(self):
        ammount_price = float(0)
        for service in self.services.filter(deleted=False):
            ammount_price += float(service.price)

        return ammount_price

    @property
    def client_full_name(self):
        return f'{self.client.user.first_name} {self.client.user.last_name}'

    def current_services(self):
        services = self.services.filter(deleted=False)
        return services
