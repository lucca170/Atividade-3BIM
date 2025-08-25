from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Task, Team, TeamMember, TaskAssignment

# ADICIONE ESTE BLOCO DE CÓDIGO QUE ESTAVA EM FALTA
from .serializers import (
    UserSerializer,
    TaskSerializer,
    TeamSerializer,
    TeamMemberSerializer,
    TaskAssignmentSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticated]

class TaskAssignmentViewSet(viewsets.ModelViewSet):
    queryset = TaskAssignment.objects.all()
    serializer_class = TaskAssignmentSerializer
    permission_classes = [IsAuthenticated]

    class TaskViewSet(viewsets.ModelViewSet):
     def perform_create(self, serializer):
         serializer.save(user=self.request.user)