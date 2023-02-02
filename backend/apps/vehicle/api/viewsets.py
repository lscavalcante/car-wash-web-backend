from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.exceptions import APIException, ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.vehicle.api import serializers
from apps.vehicle.api.serializers import ListVehicleSerializer, CreateVehicleSerializer, DetailVehicleSerializer
from apps.vehicle.models import Vehicle
from apps.vehicle.services.create_vehicle import CreateVehicle
from apps.vehicle.services.update_vehicle import UpdateVehicle
from infra.pagination.standard_result import StandardResultsSetPagination


class VehicleAPI(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = ListVehicleSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'owner__user__email']

    def create(self, request, *args, **kwargs):
        try:
            serializer = CreateVehicleSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            vehicle = CreateVehicle(user=request.user, validated_data=serializer.validated_data).run()

            return Response(DetailVehicleSerializer(instance=vehicle).data, 201)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    def list(self, request, *args, **kwargs):
        return super().list(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()

            serializer = serializers.UpdateVehicleSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            instance = UpdateVehicle(user=request.user, instance=instance, **serializer.validated_data).run()

            return Response(serializers.ListVehicleSerializer(instance=instance).data, 200)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    @action(detail=False, methods=['get'], url_path='all-vehicles', permission_classes=[])
    def all_vehicles(self, request):
        queryset = self.filter_queryset(Vehicle.objects.all())

        serializer = serializers.ListVehicleSerializer(queryset, many=True)
        return Response(serializer.data)
