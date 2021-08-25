from django.urls import path
from . import views

urlpatterns = [
    path('', views.chatListView, name='index'),
    path('<int:id>/',views.index, name='analysis'),
    path('analysis/', views.emotion_analysis, name='analysis'),
]

