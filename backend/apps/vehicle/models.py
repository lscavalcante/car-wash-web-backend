from django.db import models
from ..user.models import User, Employee, Client


class Vehicle(models.Model):
    name = models.CharField(max_length=50)
    board = models.CharField(max_length=8)
    year = models.IntegerField()
    owner = models.ForeignKey(Client, on_delete=models.CASCADE)
    washes = models.IntegerField(default=0)
    fix = models.IntegerField(default=0)
    updated_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True,
                                   related_name='vehicle_updated_by')
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True,
                                   related_name='vehicle_created_by')

    class Meta:
        ordering = ['-id']

    def __str__(self) -> str:
        return f'{self.name} - {self.board}'

    @property
    def owner_full_name(self):
        return f'{self.owner.user.first_name} {self.owner.user.last_name}'
