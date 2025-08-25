from rest_framework import serializers
from .models import User, Category, Task, Team, TeamMember, TaskAssignment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # CAMPOS DE DATA ADICIONADOS À LISTA
        fields = [
            'id', 
            'title', 
            'description', 
            'status', 
            'category', 
            'created_at', 
            'updated_at',
            'start_date',
            'due_date'
        ]

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class TaskAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        fields = '__all__'