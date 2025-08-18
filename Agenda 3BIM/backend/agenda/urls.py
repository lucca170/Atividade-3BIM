from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, 
    CategoryViewSet, 
    TaskViewSet, 
    TeamViewSet, 
    TeamMemberViewSet, 
    TaskAssignmentViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'teammembers', TeamMemberViewSet)
router.register(r'taskassignments', TaskAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]