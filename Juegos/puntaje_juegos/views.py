# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Videojuego, Jugador_VideoJuego
from django.contrib.auth.models import User

# Create your views here.

#Renderizado de los juegos
@login_required(login_url = '/')
def Juego_calaveras(request):
    return render(request, 'Calavera.html')

@login_required(login_url = '/')
def Juego_eludeAsteroids(request):
    return render(request, 'EludeAsteroids.html')

@login_required(login_url = '/')
def Juego_llorona(request):
    return render(request, 'LLorona.html')

@login_required(login_url = '/')
def juego_2048(request):
    return render(request, '2048.html')

@login_required(login_url = '/')
def juego_charizard(request):
    return render(request, 'charizard.html')


#Envio de puntajes a la Base de datos
@login_required(login_url = '/')
@csrf_exempt
def puntaje_2048(request):
    if request.method == 'POST':
        juego = Videojuego.objects.get(codigo=4)
        usuario = request.user
        puntaje = request.POST['puntaje']
        puntajePartida = Jugador_VideoJuego.objects.create(
        puntaje=puntaje, jugador=usuario, juego=juego)
        puntajePartida.save()
        return HttpResponse("Guardado")
    return HttpResponse("hola")


@login_required(login_url='/')
@csrf_exempt
def puntaje_llorona(request):
    if request.method == 'POST':
        juego = Videojuego.objects.get(codigo=2)
        usuario = request.user
        puntaje = request.POST['puntaje']
        puntajePartida = Jugador_VideoJuego.objects.create(puntaje=puntaje, jugador=usuario, juego=juego)
        puntajePartida.save()
        return HttpResponse("Guardado")
    return HttpResponse("hola")


@login_required(login_url='/')
@csrf_exempt
def puntaje_elude(request):
    if request.method == 'POST':
        juego = Videojuego.objects.get(codigo=1)
        usuario = request.user
        puntaje = request.POST['puntaje']
        puntajePartida = Jugador_VideoJuego.objects.create(puntaje=puntaje, jugador=usuario, juego=juego)
        return HttpResponse("Guardado")
    return HttpResponse("Hola")


@login_required(login_url='/')
@csrf_exempt
def puntaje_calavera(request):
    if request.method == 'POST':
        juego = Videojuego.objects.get(codigo=3)
        usuario = request.user
        puntaje = request.POST['puntaje']
        puntajePartida = Jugador_VideoJuego.objects.create(
            puntaje=puntaje, jugador=usuario, juego=juego)
        return HttpResponse("Guardado")
    return HttpResponse("Hola")


@login_required(login_url='/')
@csrf_exempt
def puntaje_charizard(request):
    if request.method == 'POST':
        juego = Videojuego.objects.get(codigo=5)
        usuario = request.user
        puntaje = request.POST['puntaje']
        puntajePartida = Jugador_VideoJuego.objects.create(
            puntaje=puntaje, jugador=usuario, juego=juego)
        return HttpResponse("Guardado")
    return HttpResponse("Hola")


#Muestra de puntajes
@login_required(login_url='/')
def mostrar_puntajes(request):
    queryTopElude = Jugador_VideoJuego.objects.filter(juego=1)[:5]
    queryTopLlorona = Jugador_VideoJuego.objects.filter(juego=2)[:5]
    queryTopCalaveras = Jugador_VideoJuego.objects.filter(juego=3)[:5]
    queryTop2048 = Jugador_VideoJuego.objects.filter(juego=4)[:5]
    queryTopCharizard = Jugador_VideoJuego.objects.filter(juego=5)[:5]

    queryEludePer = Jugador_VideoJuego.objects.filter(
        jugador=request.user, juego=1)
    queryLloronaPer = Jugador_VideoJuego.objects.filter(
        jugador=request.user, juego=2)
    queryCalaverasPer = Jugador_VideoJuego.objects.filter(
        jugador=request.user, juego=3)
    query2048Per = Jugador_VideoJuego.objects.filter(
        jugador=request.user, juego=4)
    queryCharizardPer = Jugador_VideoJuego.objects.filter(
        jugador=request.user, juego=5)
    

    contexto = {
        'topElude': queryTopElude,
        'topLlorona': queryTopLlorona,
        'topCalaveras': queryTopCalaveras,
        'top2048': queryTop2048,
        'topCharizard': queryTopCharizard,
        'perElude': queryEludePer,
        'perLlorona': queryLloronaPer,
        'perCalaveras': queryCalaverasPer,
        'per2048': query2048Per,
        'perCharizard': queryCharizardPer,
    }
    return render(request, 'puntajes.html', contexto)
