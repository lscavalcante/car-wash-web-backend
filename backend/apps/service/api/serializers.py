from rest_framework import serializers

from apps.service.models import ServiceCategory, ServiceProvided, Service
from apps.user.models import Client, User, Employee

"""
    Service Provided
"""


class ListServiceProvidedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvided
        exclude = []


class DetailServiceProvidedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvided
        exclude = []


class CreateServiceProvidedSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    price = serializers.DecimalField(max_digits=8, decimal_places=2)
    service_category = serializers.IntegerField(allow_null=True, default=None)
    service_id = serializers.IntegerField()


class UpdateServiceProvidedSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    price = serializers.DecimalField(max_digits=8, decimal_places=2)
    service_id = serializers.IntegerField()


"""
    Service Category
"""


class ListServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        exclude = []


class DetailServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = '__all__'


class CreateServiceCategorySerializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    price = serializers.DecimalField(max_digits=8, decimal_places=2)


class UpdateServiceCategorySerializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    price = serializers.DecimalField(max_digits=8, decimal_places=2)


"""
    Service
"""


class ListServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = []


class DetailServiceSerializer(serializers.ModelSerializer):
    class DetailClientServiceSerializer(serializers.ModelSerializer):
        id = serializers.IntegerField(source='user.id')
        email = serializers.CharField(source='user.email')
        first_name = serializers.CharField(source='user.first_name')
        last_name = serializers.CharField(source='user.last_name')

        class Meta:
            model = Client
            exclude = ['user']

    class DetailEmployeeServiceSerializer(serializers.ModelSerializer):
        id = serializers.IntegerField(source='user.id')
        email = serializers.CharField(source='user.email')
        first_name = serializers.CharField(source='user.first_name')
        last_name = serializers.CharField(source='user.last_name')

        class Meta:
            model = Employee
            exclude = ['user']

    services_price = serializers.FloatField(read_only=True)
    services = DetailServiceProvidedSerializer(source='current_services', many=True)
    client = DetailClientServiceSerializer()
    employee = serializers.CharField(source='created_by.user.email')

    class Meta:
        model = Service
        exclude = []


class CreateServiceSerializer(serializers.Serializer):
    class CreateServiceProvidedSerializer(serializers.Serializer):
        title = serializers.CharField(max_length=50)
        price = serializers.DecimalField(max_digits=8, decimal_places=2)
        service_category = serializers.IntegerField(allow_null=True, default=None)

    title = serializers.CharField(max_length=50)
    client = serializers.IntegerField()
    date_start = serializers.DateTimeField()
    date_end = serializers.DateTimeField()
    finish = serializers.BooleanField(default=False)
    vehicle = serializers.IntegerField()
    services = serializers.ListField(child=CreateServiceProvidedSerializer(allow_null=False, required=True),
                                     allow_empty=False)


class UpdateServiceSerializer(serializers.Serializer):
    class UpdateServiceProvidedSerializer(serializers.Serializer):
        id = serializers.IntegerField(default=None, allow_null=True)
        title = serializers.CharField(max_length=50)
        price = serializers.DecimalField(max_digits=8, decimal_places=2)
        service_category = serializers.IntegerField(allow_null=True, default=None)

    title = serializers.CharField(max_length=50)
    date_start = serializers.DateTimeField()
    date_end = serializers.DateTimeField()
    finish = serializers.BooleanField(default=False)
    services = serializers.ListField(child=UpdateServiceProvidedSerializer(allow_null=False, required=True),
                                     allow_empty=False)
