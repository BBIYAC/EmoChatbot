from django.urls import path
from . import views

urlpatterns = [
<<<<<<< HEAD
    path('', views.index, name='index'),
    path('analysis', views.emotion_analysis, name='analysis'),
    path('auth', views.auth, name='auth'),
=======
    path('', views.chatListView, name='index'),
    path('<int:id>/',views.index, name='analysis'),
    path('analysis/', views.emotion_analysis),
>>>>>>> 951b202e42f0f2ffb6189b84b43bc3beda2007ac
]

