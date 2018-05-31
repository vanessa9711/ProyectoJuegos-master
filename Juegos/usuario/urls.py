from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.autenticar, name='autenticar'),
    url(r'^inicio$', views.inicio, name='inicio'),
    url(r'^logout$', views.desautenticar, name='desautenticar'),
    url(r'^registro$', views.Registro, name='registro'),
]