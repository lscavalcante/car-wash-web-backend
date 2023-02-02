from django.urls import include, path
from rest_framework import routers

from apps.vehicle.api.viewsets import VehicleAPI

router = routers.DefaultRouter()
router.register('api/v1/vehicles', VehicleAPI)

urlpatterns = [
    path('', include(router.urls)),
]
