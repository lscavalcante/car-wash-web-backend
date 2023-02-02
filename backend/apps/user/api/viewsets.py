from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError, APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.user.api import serializers
from apps.user.api.serializers import DetailUserSerializer, UpdateUserSerializer, SimpleUserSerializer
from apps.user.models import User
from apps.user.services.authenticate_user import AuthenticateUser
from apps.user.services.update_user import UpdateUser
from infra.generic_functions.get_or_none import get_or_none


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.ListUserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filter_backends = [filters.SearchFilter]
    search_fields = ['email', 'first_name']

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.UserSerializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='login', permission_classes=[])
    def login(self, request):
        try:
            serializer = serializers.LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user: User = AuthenticateUser(**serializer.validated_data).run()

            return Response(DetailUserSerializer(instance=user).data, 200)
        except Exception as e:
            raise ParseError(detail=str(e))

    @action(detail=False, methods=['get'], url_path='clients', permission_classes=[])
    def clients(self, request):
        queryset = self.filter_queryset(User.objects.filter(is_client=True))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = serializers.ListUserSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializers.ListUserSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='all-clients', permission_classes=[])
    def all_clients(self, request):
        queryset = self.filter_queryset(User.objects.filter(is_client=True))

        serializer = serializers.ListUserSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['put'], url_path='my-account')
    def my_account(self, request):
        try:

            serializer = UpdateUserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user = UpdateUser(user=request.user, **serializer.validated_data).run()

            return Response(SimpleUserSerializer(user).data, 200)
        except APIException as e:
            raise e
        except Exception as e:
            raise ParseError(e)

    @my_account.mapping.get
    def get_my_account(self, request, pk=None):
        user = request.user

        return Response(SimpleUserSerializer(user).data, 200)

    @action(detail=True, methods=['get'], url_path='manager')
    def user_manager(self, request, pk=None):
        try:
            instance = get_or_none(User, pk=pk, raise_exception=True)
            return Response(serializers.UserSerializer(instance).data, 200)
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(detail=f'{e}')

    @user_manager.mapping.put
    def update_user_manager(self, request, pk=None):
        try:
            instance = get_or_none(User, pk=pk, raise_exception=True)

            validated_field = ['cpf', 'first_name', 'last_name', 'is_active']

            serializer = serializers.UpdateUserManagerSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            for field in validated_field:
                if field in serializer.validated_data:
                    setattr(instance, field, serializer.validated_data[field])
            instance.save()

            return Response(serializers.UserSerializer(instance).data, 200)
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(detail=f'{e}')
