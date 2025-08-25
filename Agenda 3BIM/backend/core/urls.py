from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # Rota para o painel de administração do Django
    path('admin/', admin.site.urls),

    # Inclui todas as URLs do seu aplicativo 'agenda' sob o prefixo 'api/'
    path('api/', include('agenda.urls')),

    # Rota para obter o token de autenticação (login)
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]