from django.urls import include, path
from rest_framework import routers
from apps.service.api import viewsets

router = routers.DefaultRouter()
router.register('api/v1/services', viewsets.ServiceAPI)
router.register('api/v1/services-provided', viewsets.ServiceProvidedAPI)
router.register('api/v1/services-category', viewsets.ServiceCategoryAPI)

urlpatterns = [
    path('', include(router.urls)),
]
