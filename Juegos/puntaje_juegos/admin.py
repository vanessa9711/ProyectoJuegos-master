# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .models import Jugador_VideoJuego, Videojuego 
from django.contrib import admin

# Register your models here.

@admin.register(Jugador_VideoJuego)
class AdminPuntaje_juego(admin.ModelAdmin):
    list_display=('jugador', 'juego', 'puntaje',)

@admin.register(Videojuego)
class AdminVideojuego(admin.ModelAdmin):
    list_display = ('codigo', 'nombre',)
