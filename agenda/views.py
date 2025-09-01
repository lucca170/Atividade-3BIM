# lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/backend/agenda/views.py
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from rest_framework import generics

# Pega o modelo de usuário que está ativo no projeto
User = get_user_model()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Esta view retorna a lista de tarefas
        apenas para o usuário autenticado.
        """
        return Task.objects.filter(user=self.request.user)

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]