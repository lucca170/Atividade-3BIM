# lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/backend/agenda/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Task

# Pega o modelo de usuário que está ativo no projeto
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'completed', 'user']