from django.contrib import admin
# A LINHA ABAIXO FOI CORRIGIDA/ADICIONADA
from .models import User, Category, Task, Team, TeamMember, TaskAssignment

# Registrando os modelos para que apareçam no painel de administração do Django

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # Mostrando campos que realmente existem no modelo User padrão
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'date_joined')
    search_fields = ('username', 'email')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    # O modelo Category só tem o campo 'name'
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    # O modelo Task não tem um campo 'user' direto, mas tem status, due_date, etc.
    list_display = ('title', 'status', 'due_date', 'start_date', 'created_at')
    list_filter = ('status', 'due_date')
    search_fields = ('title',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    # O modelo Team não tem 'created_at'
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    # O modelo TeamMember não tem 'joined_at'
    list_display = ('team', 'user', 'role')
    list_filter = ('team', 'role')
    search_fields = ('user__username', 'team__name')

@admin.register(TaskAssignment)
class TaskAssignmentAdmin(admin.ModelAdmin):
    list_display = ('task', 'user', 'assigned_at')
    list_filter = ('task', 'user')