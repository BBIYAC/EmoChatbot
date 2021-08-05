from django.urls import path
from . import views
from index.views import webAPI

urlpatterns = [
    path('', views.index, name='index'),
]

