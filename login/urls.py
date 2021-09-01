from django.urls import path
from . import views

urlpatterns = [
    path('', views.loginView, name='login'),
    path('signup/', views.signupView, name='signup'),
    path('getreissuedpassword/', views.getReissuedPasswordView, name='reissuedpassword'),
     path('changepassword/', views.changePasswordView, name='changepassword'),
]

