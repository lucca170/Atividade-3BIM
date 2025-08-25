from rest_framework import serializers
from .models import User, Task, Team, TeamMember, TaskAssignment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

# O CATEGORYSERIALIZER FOI REMOVIDO

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Task
        # REMOVIDO 'category' DA LISTA DE CAMPOS
        fields = [
            'id', 
            'title', 
            'description', 
            'status', 
            'created_at', 
            'updated_at',
            'start_date',
            'due_date',
            'user'
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