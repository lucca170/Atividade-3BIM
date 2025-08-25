from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CategoryViewSet, TaskViewSet, TeamViewSet, TeamMemberViewSet, TaskAssignmentViewSet

# Cria um roteador padrão
router = DefaultRouter()

# Registra as rotas para cada ViewSet
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tasks', TaskViewSet, basename='task') # O basename é crucial aqui!
router.register(r'teams', TeamViewSet)
router.register(r'team-members', TeamMemberViewSet)
router.register(r'task-assignments', TaskAssignmentViewSet)

# As URLs da API são determinadas automaticamente pelo roteador.
urlpatterns = [
    path('', include(router.urls)),
]