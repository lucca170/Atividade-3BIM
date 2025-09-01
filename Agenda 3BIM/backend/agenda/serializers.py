# lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/backend/agenda/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Task

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # --- CORREÇÃO AQUI ---
        # Retiramos a password dos dados validados
        password = validated_data.pop('password', None)
        # Criamos o utilizador com os restantes dados
        instance = self.Meta.model(**validated_data)
        # Se a password foi fornecida, nós a criptografamos com set_password
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'due_date', 'status',
            'start_date', 'created_at', 'updated_at', 'user'
        ]
        read_only_fields = ['user']