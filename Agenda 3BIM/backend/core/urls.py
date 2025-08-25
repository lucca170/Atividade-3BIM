from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CategoryViewSet, TaskViewSet, TeamViewSet, TeamMemberViewSet, TaskAssignmentViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)


router.register(r'tasks', TaskViewSet, basename='task')

router.register(r'teams', TeamViewSet)
router.register(r'team-members', TeamMemberViewSet)
router.register(r'task-assignments', TaskAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]