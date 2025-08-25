from django.contrib import admin
from .models import User, Task, Team, TeamMember, TaskAssignment

admin.site.register(User)
admin.site.register(Task)
admin.site.register(Team)
admin.site.register(TeamMember)
admin.site.register(TaskAssignment)