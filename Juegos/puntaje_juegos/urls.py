from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'Calaveras$', views.Juego_calaveras),
    url(r'EludeAsteroids$', views.Juego_eludeAsteroids),
    url(r'Llorona$', views.Juego_llorona),
    url(r'2048$', views.juego_2048),
 	url(r'Charizard$', views.juego_charizard),
    url(r'2048/enviar$', views.puntaje_2048),
    url(r'Llorona/enviar$', views.puntaje_llorona),
    url(r'EludeAsteroids/enviar$', views.puntaje_elude),
    url(r'Calaveras/enviar$', views.puntaje_calavera),
    url(r'Charizard/enviar$', views.puntaje_charizard),
    url(r'puntajes$', views.mostrar_puntajes)
]
