from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
import datetime
from django.http import JsonResponse

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'username', 'email', 'hospital_name',
            'PhoneNumber', 'password'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data.get('email')
        validated_data['password'] = make_password(validated_data.get('password'))

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('User already exists.')

        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['password'] = make_password(validated_data.get('password', instance.password))
        return super().update(instance, validated_data)

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'UserID', 'first_name', 'last_name', 'username', 'email', 'hospital_name', 'PhoneNumber'
        ]

class UserProfileSerializer(serializers.ModelSerializer):
    Img = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'username', 'email', 'PhoneNumber', 'UserID', 'Img', 'hospital_name'
        ]

    def get_Img(self, user):
        request = self.context.get('request')
        img = user.Img.url
        return request.build_absolute_uri(img)
