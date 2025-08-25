from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Removido CategoryViewSet do import
from .views import UserViewSet, TaskViewSet, TeamViewSet, TeamMemberViewSet, TaskAssignmentViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
# A LINHA QUE REGISTAVA 'categories' FOI REMOVIDA
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'teams', TeamViewSet)
router.register(r'team-members', TeamMemberViewSet)
router.register(r'task-assignments', TaskAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]