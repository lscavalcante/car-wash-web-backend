from django.urls import include, path
from rest_framework import routers

from apps.user.api.viewsets import UserAPI
from apps.vehicle.api.viewsets import VehicleAPI

router = routers.DefaultRouter()
router.register('api/v1/users', UserAPI)

urlpatterns = [
    path('', include(router.urls)),
]
