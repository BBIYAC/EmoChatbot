from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('analysis', views.emotion_analysis, name='analysis'),
    path('notice', views.get_notice_time, name='notice'),
]

