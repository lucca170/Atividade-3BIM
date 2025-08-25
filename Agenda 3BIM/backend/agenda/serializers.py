from rest_framework import serializers
from .models import User, Category, Task, Team, TeamMember, TaskAssignment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Adiciona 'password' aos campos para o registro
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            # Garante que a senha seja apenas para escrita (não será retornada na API)
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Este método é chamado ao criar um novo usuário.
        # Ele usa a função create_user para garantir que a senha seja "hasheada".
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    # Campo para associar a tarefa ao usuário, mas será preenchido automaticamente
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'status',
            'category',
            'created_at',
            'updated_at',
            'start_date',
            'due_date',
            'user' # Adicionado o campo user
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