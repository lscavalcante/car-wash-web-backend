from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.exceptions import APIException, ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.service.api import serializers
from apps.service.models import ServiceCategory, ServiceProvided, Service
from apps.service.services.create_service import CreateService
from apps.service.services.create_service_category import CreateServiceCategory
from apps.service.services.create_service_provided import CreateServiceProvided
from apps.service.services.update_service import UpdateService
from apps.service.services.update_service_category import UpdateServiceCategory
from apps.service.services.update_service_provided import UpdateServiceProvided
from infra.generic_functions.get_or_none import get_or_none
from infra.pagination.standard_result import StandardResultsSetPagination


class ServiceAPI(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = serializers.ListServiceSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    def create(self, request, *args, **kwargs):
        try:
            serializer = serializers.CreateServiceSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            service = CreateService(user=request.user, validated_data=serializer.validated_data).run()

            return Response(serializers.DetailServiceSerializer(instance=service).data, 201)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    def list(self, request, *args, **kwargs):
        return super().list(self, request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.DetailServiceSerializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        try:
            serializer = serializers.UpdateServiceSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            service = UpdateService(
                user=request.user,
                service_id=self.kwargs.get('pk'),
                validated_data=serializer.validated_data
            ).run()

            return Response(serializers.DetailServiceSerializer(instance=service).data, 200)

        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    @action(detail=True, methods=['get'], url_path='service-provided')
    def service_provided(self, request, pk=None):
        service = get_or_none(Service, pk=pk, raise_exception=True)
        services_provided = service.services.filter(deleted=False)

        return Response(serializers.DetailServiceProvidedSerializer(services_provided, many=True).data, 200)


class ServiceProvidedAPI(viewsets.ModelViewSet):
    queryset = ServiceProvided.objects.all()
    serializer_class = serializers.ListServiceProvidedSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    def create(self, request, *args, **kwargs):
        try:
            serializer = serializers.CreateServiceProvidedSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            service_provided = CreateServiceProvided(user=request.user, validated_data=serializer.validated_data).run()

            return Response(serializers.DetailServiceProvidedSerializer(instance=service_provided).data, 201)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    def update(self, request, *args, **kwargs):
        try:
            serializer = serializers.UpdateServiceProvidedSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            service_provided_instance = self.get_object()

            if not service_provided_instance.service_set.filter(
                    id=serializer.validated_data.get('service_id')).exists():
                raise ParseError(detail='Not has match service provided with service id')

            service_provided = UpdateServiceProvided(user=request.user, service_provided=service_provided_instance,
                                                     **serializer.validated_data
                                                     ).run()

            return Response(serializers.DetailServiceProvidedSerializer(instance=service_provided).data, 200)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    def list(self, request, *args, **kwargs):
        return super().list(self, request, *args, **kwargs)

    @action(detail=True, url_path='services/(?P<service_pk>\d+)', methods=['put'])
    def service_provided(self, request, pk=None, service_pk=None):
        serializer = serializers.UpdateServiceProvidedSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        service = get_or_none(Service, pk=service_pk, raise_exception=True)
        if not service.services.filter(id=pk).exists():
            raise ParseError(detail='Service provided for this service not found')
        service_provided_instance = get_or_none(ServiceProvided, pk=pk, raise_exception=True)

        service_provided = UpdateServiceProvided(user=request.user, service_provided=service_provided_instance,
                                                 **serializer.validated_data
                                                 ).run()

        return Response(serializers.DetailServiceProvidedSerializer(instance=service_provided).data, 200)

    @service_provided.mapping.delete
    def delete_service_provided(self, request, pk=None, service_pk=None):
        service = get_or_none(Service, pk=service_pk, raise_exception=True)
        if not service.services.filter(id=pk).exists():
            raise ParseError(detail='Service provided for this service not found')
        service_provided_instance = get_or_none(ServiceProvided, pk=pk, raise_exception=True)

        service_provided_instance.updated_by_id = request.user.id
        service_provided_instance.deleted = True
        service_provided_instance.save()

        return Response({'message': 'Service provided deleted with success'}, status=200)


class ServiceCategoryAPI(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = serializers.ListServiceCategorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    def create(self, request, *args, **kwargs):
        try:
            serializer = serializers.CreateServiceCategorySerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            service_category = CreateServiceCategory(user=request.user, validated_data=serializer.validated_data).run()

            return Response(serializers.DetailServiceCategorySerializer(instance=service_category).data, 201)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    def update(self, request, *args, **kwargs):
        try:
            service_category_instance = self.get_object()

            serializer = serializers.UpdateServiceCategorySerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            service_category = UpdateServiceCategory(user=request.user, service_category=service_category_instance,
                                                     **serializer.validated_data
                                                     ).run()

            return Response(serializers.DetailServiceCategorySerializer(instance=service_category).data, 200)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(detail=f'{e}')

    def list(self, request, *args, **kwargs):
        return super().list(self, request, *args, **kwargs)

    @action(detail=False, methods=['get'], url_path='all-services-category', permission_classes=[],
            authentication_classes=[])
    def all_service_category(self, request):
        queryset = self.filter_queryset(ServiceCategory.objects.all())

        serializer = serializers.ListServiceCategorySerializer(queryset, many=True)
        return Response(serializer.data)
