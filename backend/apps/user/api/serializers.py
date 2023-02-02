from rest_framework import serializers

from apps.user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'last_login', 'is_superuser', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined',
                  'is_employee', 'is_client', 'email', 'cpf', 'groups', 'user_permissions']
        model = User


class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'last_login', 'is_superuser', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined',
                  'is_employee', 'is_client', 'email', 'cpf', 'groups', 'user_permissions']
        model = User


class DetailUserSerializer(serializers.ModelSerializer):

    def get_tokens(self, user: User):
        return user.get_tokens_for_user()

    tokens = serializers.SerializerMethodField(method_name='get_tokens')

    class Meta:
        model = User
        exclude = ['last_login', 'date_joined', 'password']


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['last_login', 'date_joined', 'password']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=255)


class UpdateUserSerializer(serializers.Serializer):
    cpf = serializers.CharField(required=False)
    last_name = serializers.CharField(max_length=255, required=False)
    first_name = serializers.CharField(max_length=255, required=False)


class UpdateUserManagerSerializer(serializers.Serializer):
    cpf = serializers.CharField(required=False)
    last_name = serializers.CharField(max_length=255, required=False)
    first_name = serializers.CharField(max_length=255, required=False)
    is_active = serializers.BooleanField()
